import type { NextRequest } from "next/server";
import { z } from "zod";
import {
  VoteError,
  clientIpHash,
  getVoteDb,
  must,
  parseBody,
  phoneSchema,
  verifyPassword,
  voteFailure,
} from "@/lib/vote/auth";
import { issueOtp, otpSentResponse } from "@/lib/vote/otp";

const LOCK_AFTER_FAILURES = 5;
const LOCK_MINUTES = 15;

const loginSchema = z.object({
  phone: phoneSchema,
  password: z.string().min(1, "अपना पासवर्ड डालें").max(72, "पासवर्ड बहुत लंबा है"),
});

/** Step 1 of login: a correct password asks for the Telegram OTP, and only the OTP starts a session. */
export async function POST(request: NextRequest) {
  try {
    const { phone, password } = await parseBody(request, loginSchema);
    const db = getVoteDb();

    const user = must(
      await db
        .from("vote_users")
        .select("id, password_hash, failed_logins, locked_until, telegram_chat_id")
        .eq("phone", phone)
        .maybeSingle()
    );
    if (!user) throw new VoteError("इस नंबर से कोई अकाउंट नहीं है। पहले अकाउंट बनाएँ।", 404);

    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      const minutes = Math.ceil((new Date(user.locked_until).getTime() - Date.now()) / 60_000);
      throw new VoteError(`बहुत बार गलत पासवर्ड डाला गया। ${minutes} मिनट बाद कोशिश करें।`, 429);
    }

    if (!(await verifyPassword(password, user.password_hash))) {
      const failures = user.failed_logins + 1;
      const lock = failures >= LOCK_AFTER_FAILURES;
      must(
        await db
          .from("vote_users")
          .update({
            failed_logins: lock ? 0 : failures,
            locked_until: lock ? new Date(Date.now() + LOCK_MINUTES * 60_000).toISOString() : null,
          })
          .eq("id", user.id)
      );
      throw lock
        ? new VoteError(`बहुत बार गलत पासवर्ड डाला गया। ${LOCK_MINUTES} मिनट बाद कोशिश करें।`, 429)
        : new VoteError("गलत पासवर्ड", 401);
    }

    if (user.failed_logins) {
      must(await db.from("vote_users").update({ failed_logins: 0 }).eq("id", user.id));
    }

    const otp = await issueOtp(db, {
      phone,
      purpose: "login",
      payload: { userId: user.id },
      ipHash: clientIpHash(request),
      origin: request.nextUrl.origin,
      telegramChatId: user.telegram_chat_id,
    });
    return otpSentResponse(phone, otp);
  } catch (caught) {
    return voteFailure(caught);
  }
}

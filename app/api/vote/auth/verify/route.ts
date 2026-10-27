import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import {
  VoteError,
  getVoteDb,
  must,
  parseBody,
  setSessionCookie,
  startSession,
  toVoteUser,
  voteFailure,
} from "@/lib/vote/auth";
import { verifyOtp } from "@/lib/vote/otp";

const verifySchema = z.object({
  challengeId: z.string().uuid("नया OTP माँगें"),
  code: z.string().trim().regex(/^\d{6}$/, "6 अंकों का OTP डालें"),
});

/** Step 2 of signup and login: a correct OTP creates the account (signup) and starts a session. */
export async function POST(request: NextRequest) {
  try {
    const { challengeId, code } = await parseBody(request, verifySchema);
    const db = getVoteDb();
    const challenge = await verifyOtp(db, challengeId, code);

    let user: { id: string; phone: string; name: string; role: string } | null;
    if (challenge.purpose === "signup") {
      const created = await db
        .from("vote_users")
        .insert({
          phone: challenge.phone,
          name: challenge.payload.name,
          password_hash: challenge.payload.passwordHash,
          telegram_chat_id: challenge.telegramChatId,
        })
        .select("id, phone, name, role")
        .single();
      if (created.error?.code === "23505") {
        throw new VoteError("यह नंबर पहले से रजिस्टर है। कृपया लॉग इन करें।", 409);
      }
      user = must(created);
    } else {
      user = must(
        await db.from("vote_users").select("id, phone, name, role").eq("id", challenge.payload.userId).maybeSingle()
      );
      if (!user) throw new VoteError("यह अकाउंट अब मौजूद नहीं है", 404);
    }

    const { token, expiresAt } = await startSession(db, user.id);
    // Remembering the chat lets the next login send its code straight to Telegram.
    must(
      await db
        .from("vote_users")
        .update({
          last_login_at: new Date().toISOString(),
          ...(challenge.telegramChatId ? { telegram_chat_id: challenge.telegramChatId } : {}),
        })
        .eq("id", user.id)
    );

    const response = NextResponse.json({ success: true, user: toVoteUser(user) });
    setSessionCookie(response, token, expiresAt);
    return response;
  } catch (caught) {
    return voteFailure(caught);
  }
}

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
  challengeId: z.string().uuid("Please ask for a new OTP"),
  code: z.string().trim().regex(/^\d{6}$/, "Enter the 6 digit OTP"),
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
        })
        .select("id, phone, name, role")
        .single();
      if (created.error?.code === "23505") {
        throw new VoteError("This number is already registered. Please login.", 409);
      }
      user = must(created);
    } else {
      user = must(
        await db.from("vote_users").select("id, phone, name, role").eq("id", challenge.payload.userId).maybeSingle()
      );
      if (!user) throw new VoteError("This account no longer exists", 404);
    }

    const { token, expiresAt } = await startSession(db, user.id);
    must(await db.from("vote_users").update({ last_login_at: new Date().toISOString() }).eq("id", user.id));

    const response = NextResponse.json({ success: true, user: toVoteUser(user) });
    setSessionCookie(response, token, expiresAt);
    return response;
  } catch (caught) {
    return voteFailure(caught);
  }
}

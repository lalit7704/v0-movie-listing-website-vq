import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { VOTE_COOKIE, clearSessionCookie, getVoteDb, getVoteSession, sha256, voteFailure } from "@/lib/vote/auth";

/** The signed-in voter, or null. */
export async function GET() {
  try {
    const session = await getVoteSession();
    return NextResponse.json(
      { success: true, user: session?.user ?? null },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (caught) {
    return voteFailure(caught);
  }
}

/** Logout: ends this session on the server and clears the cookie. */
export async function DELETE() {
  const token = (await cookies()).get(VOTE_COOKIE)?.value;
  if (token) {
    try {
      await getVoteDb().from("vote_sessions").delete().eq("token_hash", sha256(token));
    } catch {
      // The cookie is cleared below either way.
    }
  }

  const response = NextResponse.json({ success: true });
  clearSessionCookie(response);
  return response;
}

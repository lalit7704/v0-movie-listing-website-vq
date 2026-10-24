import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  VOTE_COOKIE,
  clearSessionCookie,
  getVoteDb,
  getVoteSession,
  must,
  nameSchema,
  parseBody,
  requireVoteSession,
  sha256,
  toVoteUser,
  voteFailure,
} from "@/lib/vote/auth";

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

const profileSchema = z.object({ name: nameSchema });

/** Changes the signed-in voter's name. The phone number is the login, so it stays. */
export async function PATCH(request: NextRequest) {
  const session = await requireVoteSession("voter");
  if (session instanceof NextResponse) return session;

  try {
    const { name } = await parseBody(request, profileSchema);
    const row = must(
      await session.db
        .from("vote_users")
        .update({ name })
        .eq("id", session.user.id)
        .select("id, phone, name, role")
        .single()
    );
    return NextResponse.json({ success: true, user: toVoteUser(row) });
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

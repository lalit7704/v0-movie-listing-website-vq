import { NextResponse } from "next/server";
import { requireVoteSession, voteFailure } from "@/lib/vote/auth";
import { loadPolls } from "@/lib/vote/polls";

export async function GET() {
  const session = await requireVoteSession("voter");
  if (session instanceof NextResponse) return session;

  try {
    const polls = await loadPolls(session.db, session.user.id);
    return NextResponse.json({ success: true, polls }, { headers: { "Cache-Control": "no-store" } });
  } catch (caught) {
    return voteFailure(caught);
  }
}

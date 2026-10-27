import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { VoteError, must, requireVoteSession, voteFailure } from "@/lib/vote/auth";
import type { PollVoter } from "@/lib/vote/types";

const PAGE_SIZE = 1000;

interface VoteRow {
  option_id: string;
  created_at: string;
  voter: { name: string; phone: string };
}

/** Who voted for what in one poll. Owner only, because it shows phone numbers. */
export async function GET(request: NextRequest) {
  const session = await requireVoteSession("owner");
  if (session instanceof NextResponse) return session;

  try {
    const pollId = request.nextUrl.searchParams.get("pollId");
    if (!pollId || !z.string().uuid().safeParse(pollId).success) throw new VoteError("पोल की पहचान नहीं मिली");
    const { db } = session;

    const options: { id: string; label: string }[] = must(
      await db.from("vote_options").select("id, label").eq("poll_id", pollId)
    );
    const labels = new Map(options.map((option) => [option.id, option.label]));

    // Supabase returns at most 1000 rows per request, so read the votes page by page.
    const voters: PollVoter[] = [];
    for (let from = 0; ; from += PAGE_SIZE) {
      const rows = must(
        await db
          .from("vote_votes")
          .select("option_id, created_at, voter:vote_users(name, phone)")
          .eq("poll_id", pollId)
          .order("created_at", { ascending: false })
          .order("user_id")
          .range(from, from + PAGE_SIZE - 1)
          .overrideTypes<VoteRow[], { merge: false }>()
      );
      voters.push(
        ...rows.map((row) => ({
          name: row.voter.name,
          phone: row.voter.phone,
          option: labels.get(row.option_id) ?? "",
          votedAt: row.created_at,
        }))
      );
      if (rows.length < PAGE_SIZE) break;
    }

    return NextResponse.json({ success: true, voters }, { headers: { "Cache-Control": "no-store" } });
  } catch (caught) {
    return voteFailure(caught);
  }
}

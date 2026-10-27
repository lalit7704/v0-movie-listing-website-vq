import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { VoteError, must, parseBody, requireVoteSession, voteFailure } from "@/lib/vote/auth";
import { isPollOpen } from "@/lib/vote/polls";

const voteSchema = z.object({
  pollId: z.string().uuid("पोल नहीं मिला"),
  optionId: z.string().uuid("पहले कोई विकल्प चुनें"),
});

/** One vote per user per poll; the table's primary key enforces it. */
export async function POST(request: NextRequest) {
  const session = await requireVoteSession("voter");
  if (session instanceof NextResponse) return session;

  try {
    const { pollId, optionId } = await parseBody(request, voteSchema);
    const { db, user } = session;

    const poll = must(await db.from("vote_polls").select("status, ends_at").eq("id", pollId).maybeSingle());
    if (!poll) throw new VoteError("यह पोल अब मौजूद नहीं है", 404);
    if (!isPollOpen(poll)) throw new VoteError("इस पोल की वोटिंग बंद हो चुकी है");

    const { error } = await db.from("vote_votes").insert({ poll_id: pollId, option_id: optionId, user_id: user.id });
    if (error?.code === "23505") throw new VoteError("आप इस पोल में पहले ही वोट दे चुके हैं", 409);
    if (error?.code === "23503") throw new VoteError("यह विकल्प इस पोल का हिस्सा नहीं है");
    if (error) must({ data: null, error });

    return NextResponse.json({ success: true });
  } catch (caught) {
    return voteFailure(caught);
  }
}

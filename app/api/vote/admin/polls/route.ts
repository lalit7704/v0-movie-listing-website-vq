import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { VoteError, must, parseBody, requireVoteSession, voteFailure } from "@/lib/vote/auth";
import { loadPolls } from "@/lib/vote/polls";

export async function GET() {
  const session = await requireVoteSession("manager");
  if (session instanceof NextResponse) return session;

  try {
    const polls = await loadPolls(session.db, session.user.id, true);
    const voters = await session.db.from("vote_users").select("id", { count: "exact", head: true });
    must(voters);
    return NextResponse.json(
      { success: true, polls, totalUsers: voters.count ?? 0 },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (caught) {
    return voteFailure(caught);
  }
}

const pollSchema = z.object({
  question: z.string().trim().min(3, "Question is too short").max(200, "Question is too long"),
  description: z.string().trim().max(500, "Description is too long").default(""),
  options: z
    .array(z.string().trim().max(120, "An option is too long"))
    .transform((options) => options.filter(Boolean))
    .pipe(z.array(z.string()).min(2, "Add at least 2 options").max(10, "At most 10 options")),
  endsAt: z.union([z.literal(""), z.string().datetime("End time is not valid")]).default(""),
});

export async function POST(request: NextRequest) {
  const session = await requireVoteSession("manager");
  if (session instanceof NextResponse) return session;

  try {
    const { question, description, options, endsAt } = await parseBody(request, pollSchema);
    if (new Set(options.map((option) => option.toLowerCase())).size !== options.length) {
      throw new VoteError("Each option must be different");
    }
    if (endsAt && new Date(endsAt) <= new Date()) throw new VoteError("End time must be in the future");

    const { db, user } = session;
    const poll = must(
      await db
        .from("vote_polls")
        .insert({ question, description: description || null, ends_at: endsAt || null, created_by: user.id })
        .select("id")
        .single()
    );

    const inserted = await db
      .from("vote_options")
      .insert(options.map((label, position) => ({ poll_id: poll.id, label, position })));
    if (inserted.error) {
      // A poll without options is useless, so it goes too.
      await db.from("vote_polls").delete().eq("id", poll.id);
      must(inserted);
    }

    return NextResponse.json({ success: true, id: poll.id });
  } catch (caught) {
    return voteFailure(caught);
  }
}

const updateSchema = z.object({ status: z.enum(["open", "closed"]) });

/** Close or reopen a poll. Reopening one whose end time has passed also clears that end time. */
export async function PATCH(request: NextRequest) {
  const session = await requireVoteSession("manager");
  if (session instanceof NextResponse) return session;

  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id || !z.string().uuid().safeParse(id).success) throw new VoteError("Missing poll id");
    const { status } = await parseBody(request, updateSchema);
    const { db } = session;

    const poll = must(await db.from("vote_polls").select("ends_at").eq("id", id).maybeSingle());
    if (!poll) throw new VoteError("This poll no longer exists", 404);

    const endedAlready = poll.ends_at && new Date(poll.ends_at) <= new Date();
    must(
      await db
        .from("vote_polls")
        .update(status === "open" && endedAlready ? { status, ends_at: null } : { status })
        .eq("id", id)
    );
    return NextResponse.json({ success: true });
  } catch (caught) {
    return voteFailure(caught);
  }
}

/** Deletes the poll with its options and votes. */
export async function DELETE(request: NextRequest) {
  const session = await requireVoteSession("manager");
  if (session instanceof NextResponse) return session;

  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id || !z.string().uuid().safeParse(id).success) throw new VoteError("Missing poll id");
    must(await session.db.from("vote_polls").delete().eq("id", id));
    return NextResponse.json({ success: true });
  } catch (caught) {
    return voteFailure(caught);
  }
}

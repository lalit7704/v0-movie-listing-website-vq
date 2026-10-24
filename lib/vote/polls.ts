import type { SupabaseClient } from "@supabase/supabase-js";
import { must } from "@/lib/vote/auth";
import type { PollView } from "@/lib/vote/types";

const POLL_COLUMNS =
  "id, question, description, status, ends_at, created_at, creator:vote_users(name), vote_options(id, label, position, vote_count)";

interface PollRow {
  id: string;
  question: string;
  description: string | null;
  status: "open" | "closed";
  ends_at: string | null;
  created_at: string;
  creator: { name: string } | null;
  vote_options: { id: string; label: string; position: number; vote_count: number }[];
}

export function isPollOpen(poll: { status: string; ends_at: string | null }) {
  return poll.status === "open" && (!poll.ends_at || new Date(poll.ends_at) > new Date());
}

/** Voters see counts only after voting or once the poll closes; managers always see them. */
function toPollView(row: PollRow, myOptionId: string | null, forManager: boolean): PollView {
  const options = [...row.vote_options].sort((a, b) => a.position - b.position);
  const isOpen = isPollOpen(row);
  const reveal = forManager || Boolean(myOptionId) || !isOpen;

  return {
    id: row.id,
    question: row.question,
    description: row.description,
    isOpen,
    status: row.status,
    endsAt: row.ends_at,
    createdAt: row.created_at,
    createdBy: forManager ? (row.creator?.name ?? null) : null,
    options: options.map((option) => ({
      id: option.id,
      label: option.label,
      votes: reveal ? option.vote_count : null,
    })),
    totalVotes: reveal ? options.reduce((sum, option) => sum + option.vote_count, 0) : null,
    myOptionId,
  };
}

/** Latest 100 polls, open ones first, each with the given user's vote. */
export async function loadPolls(db: SupabaseClient, userId: string, forManager = false) {
  const rows = must(
    await db
      .from("vote_polls")
      .select(POLL_COLUMNS)
      .order("created_at", { ascending: false })
      .limit(100)
      .overrideTypes<PollRow[], { merge: false }>()
  );

  const mine: { poll_id: string; option_id: string }[] = rows.length
    ? must(
        await db
          .from("vote_votes")
          .select("poll_id, option_id")
          .eq("user_id", userId)
          .in(
            "poll_id",
            rows.map((row) => row.id)
          )
      )
    : [];
  const myVotes = new Map(mine.map((vote) => [vote.poll_id, vote.option_id]));

  // sort() is stable, so each group stays newest first.
  return rows
    .map((row) => toPollView(row, myVotes.get(row.id) ?? null, forManager))
    .sort((a, b) => Number(b.isOpen) - Number(a.isOpen));
}

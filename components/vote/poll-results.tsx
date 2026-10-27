import { Check, Lock, Trophy } from "lucide-react";
import { PollCountdown } from "@/components/vote/poll-countdown";
import { OptionAvatar } from "@/components/vote/vote-ui";
import { formatDateTime } from "@/components/vote/vote-api";
import type { PollView } from "@/lib/vote/types";

/** Live/Closed pill, plus a live countdown while a poll with an end time is open. onEnd fires when it runs out. */
export function PollStatus({ poll, onEnd }: { poll: PollView; onEnd?: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {poll.isOpen ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-500/25">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Live
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-inset ring-white/10">
          <Lock className="h-3 w-3" aria-hidden="true" />
          Closed
        </span>
      )}
      {poll.isOpen && poll.endsAt && <PollCountdown endsAt={poll.endsAt} onEnd={onEnd} />}
    </div>
  );
}

/** Total votes on the left, end time on the right. Voters see no total until they have voted. */
export function PollFooter({ poll }: { poll: PollView }) {
  const total = poll.totalVotes;
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-border bg-white/[0.015] px-5 py-3 text-xs text-muted-foreground sm:px-6">
      <span className="tabular-nums">
        {total === null ? "Results appear after you vote" : `${total.toLocaleString("en-IN")} ${total === 1 ? "vote" : "votes"}`}
      </span>
      <span>
        {poll.endsAt
          ? `${poll.isOpen ? "Closes" : "Closed"} ${formatDateTime(poll.endsAt)}`
          : poll.isOpen
            ? "No closing time"
            : "Final result"}
      </span>
    </div>
  );
}

/** One row per option with its share; the leader is marked and so is the viewer's own choice. */
export function PollResults({ poll }: { poll: PollView }) {
  const total = poll.totalVotes ?? 0;
  const top = Math.max(0, ...poll.options.map((option) => option.votes ?? 0));
  const leaders = poll.options.filter((option) => top > 0 && option.votes === top).length;
  const leaderLabel = leaders > 1 ? "Tied" : poll.isOpen ? "Leading" : "Winner";

  return (
    <ul className="space-y-4">
      {poll.options.map((option, index) => {
        const votes = option.votes ?? 0;
        const percent = total ? Math.round((votes / total) * 100) : 0;
        const isLeader = top > 0 && votes === top;
        const mine = option.id === poll.myOptionId;

        return (
          <li key={option.id} className="flex items-center gap-3">
            <OptionAvatar label={option.label} index={index} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="truncate text-sm font-medium text-foreground">{option.label}</span>
                  {isLeader && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-semibold text-red-300 ring-1 ring-inset ring-primary/30">
                      {leaderLabel === "Winner" && <Trophy className="h-3 w-3" aria-hidden="true" />}
                      {leaderLabel}
                    </span>
                  )}
                  {mine && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
                      <Check className="h-3 w-3" aria-hidden="true" />
                      Your vote
                    </span>
                  )}
                </p>
                <p className="shrink-0 tabular-nums">
                  <span className="text-sm font-semibold text-foreground">{percent}%</span>
                  <span className="ml-1.5 text-xs text-muted-foreground">
                    {votes.toLocaleString("en-IN")} {votes === 1 ? "vote" : "votes"}
                  </span>
                </p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`h-full rounded-full transition-[width] duration-700 ${isLeader ? "bg-primary" : "bg-white/25"}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

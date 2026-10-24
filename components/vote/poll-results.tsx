import { CircleCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PollCountdown } from "@/components/vote/poll-countdown";
import { formatDateTime } from "@/components/vote/vote-api";
import type { PollView } from "@/lib/vote/types";

/** Open/Closed badge, plus a live countdown while a poll with an end time is open. onEnd fires when it runs out. */
export function PollStatus({ poll, onEnd }: { poll: PollView; onEnd?: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
      <Badge variant={poll.isOpen ? "default" : "secondary"}>{poll.isOpen ? "Open" : "Closed"}</Badge>
      {poll.endsAt &&
        (poll.isOpen ? (
          <>
            <PollCountdown endsAt={poll.endsAt} onEnd={onEnd} />
            <span>{formatDateTime(poll.endsAt)}</span>
          </>
        ) : (
          <span>Ended {formatDateTime(poll.endsAt)}</span>
        ))}
    </div>
  );
}

/** One bar per option; the user's own choice is marked. */
export function PollResults({ poll }: { poll: PollView }) {
  const total = poll.totalVotes ?? 0;
  const leading = Math.max(0, ...poll.options.map((option) => option.votes ?? 0));

  return (
    <div className="space-y-3">
      <ul className="space-y-3">
        {poll.options.map((option) => {
          const votes = option.votes ?? 0;
          const percent = total ? Math.round((votes / total) * 100) : 0;
          const mine = option.id === poll.myOptionId;
          return (
            <li key={option.id}>
              <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                <span className={`flex min-w-0 items-center gap-1.5 ${mine ? "font-semibold text-foreground" : "text-foreground/90"}`}>
                  <span className="truncate">{option.label}</span>
                  {mine && (
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-primary">
                      <CircleCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      Your vote
                    </span>
                  )}
                </span>
                <span className="shrink-0 tabular-nums text-muted-foreground">
                  {percent}% · {votes}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all ${votes > 0 && votes === leading ? "bg-primary" : "bg-primary/50"}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="text-xs text-muted-foreground">
        {total} {total === 1 ? "vote" : "votes"}
      </p>
    </div>
  );
}

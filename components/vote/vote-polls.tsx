"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/admin/notice";
import { PollResults, PollStatus } from "@/components/vote/poll-results";
import { errorText, voteRequest } from "@/components/vote/vote-api";
import type { PollView } from "@/lib/vote/types";

function PollCard({ poll, onVoted }: { poll: PollView; onVoted: () => Promise<void> }) {
  const [choice, setChoice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const canVote = poll.isOpen && !poll.myOptionId;

  async function handleVote() {
    if (!choice) return;
    setBusy(true);
    setMessage(null);
    try {
      await voteRequest("/api/vote/votes", "POST", { pollId: poll.id, optionId: choice });
    } catch (caught) {
      setMessage(errorText(caught));
    }
    // Reload either way: an "already voted" or "closed" answer means the shown poll is out of date.
    await onVoted();
    setBusy(false);
  }

  return (
    <article className="rounded-lg border border-border bg-card p-4 sm:p-5">
      <PollStatus poll={poll} onEnd={() => void onVoted()} />
      <h2 className="mt-2 text-lg font-semibold text-foreground">{poll.question}</h2>
      {poll.description && <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{poll.description}</p>}

      <div className="mt-4">
        {canVote ? (
          <fieldset disabled={busy} className="space-y-2">
            <legend className="sr-only">{poll.question}</legend>
            {poll.options.map((option) => (
              <label
                key={option.id}
                className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5 text-sm transition-colors ${
                  choice === option.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-foreground/90 hover:border-primary/50"
                }`}
              >
                <input
                  type="radio"
                  name={`poll-${poll.id}`}
                  value={option.id}
                  checked={choice === option.id}
                  onChange={() => setChoice(option.id)}
                  className="h-4 w-4 accent-primary"
                />
                {option.label}
              </label>
            ))}
            <Button className="mt-2 gap-2" disabled={!choice || busy} onClick={() => void handleVote()}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Vote className="h-4 w-4" aria-hidden="true" />}
              Submit vote
            </Button>
          </fieldset>
        ) : (
          <PollResults poll={poll} />
        )}
      </div>
      {message && <p className="mt-3 text-sm text-yellow-300">{message}</p>}
    </article>
  );
}

export function VotePolls() {
  const [polls, setPolls] = useState<PollView[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadPolls = useCallback(async () => {
    try {
      const data = await voteRequest<{ polls: PollView[] }>("/api/vote/polls");
      setPolls(data.polls);
      setError(null);
    } catch (caught) {
      setError(errorText(caught));
    }
  }, []);

  useEffect(() => {
    void loadPolls();
  }, [loadPolls]);

  if (polls === null) {
    return error ? (
      <Notice tone="error">{error}</Notice>
    ) : (
      <div className="flex justify-center py-16 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" aria-label="Loading polls" />
      </div>
    );
  }

  if (!polls.length) {
    return (
      <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
        No polls yet. Please check back soon.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <Notice tone="error">{error}</Notice>}
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} onVoted={loadPolls} />
      ))}
    </div>
  );
}

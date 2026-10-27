"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, CircleCheck, Inbox, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/admin/notice";
import { PollFooter, PollResults, PollStatus } from "@/components/vote/poll-results";
import { OptionAvatar } from "@/components/vote/vote-ui";
import { errorText, voteRequest } from "@/components/vote/vote-api";
import type { PollView } from "@/lib/vote/types";

/** Pick one option, confirm, then the card turns into the results with a receipt. */
function PollCard({ poll, onChanged }: { poll: PollView; onChanged: () => Promise<void> }) {
  const [choice, setChoice] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const canVote = poll.isOpen && !poll.myOptionId;
  const chosen = poll.options.find((option) => option.id === choice);
  const myOption = poll.options.find((option) => option.id === poll.myOptionId);

  async function castVote() {
    if (!chosen) return;
    setBusy(true);
    setMessage(null);
    try {
      await voteRequest("/api/vote/votes", "POST", { pollId: poll.id, optionId: chosen.id });
    } catch (caught) {
      setMessage(errorText(caught));
    }
    // Reload either way: an "already voted" or "closed" answer means the shown poll is out of date.
    await onChanged();
    setConfirming(false);
    setBusy(false);
  }

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="p-5 sm:p-6">
        <PollStatus poll={poll} onEnd={() => void onChanged()} />
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground sm:text-xl">{poll.question}</h3>
        {poll.description && (
          <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{poll.description}</p>
        )}
      </div>

      <div className="border-t border-border p-5 sm:p-6">
        {canVote ? (
          <fieldset disabled={busy}>
            <legend className="mb-3 text-sm font-semibold text-muted-foreground">किसी एक को चुनें</legend>
            <div className="space-y-2">
              {poll.options.map((option, index) => {
                const selected = choice === option.id;
                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring ${
                      selected ? "border-primary bg-primary/[0.07]" : "border-border hover:border-white/20 hover:bg-white/[0.02]"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`poll-${poll.id}`}
                      value={option.id}
                      checked={selected}
                      onChange={() => {
                        setChoice(option.id);
                        setConfirming(false);
                      }}
                      className="sr-only"
                    />
                    <OptionAvatar label={option.label} index={index} />
                    <span className="flex-1 text-sm font-medium text-foreground">{option.label}</span>
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        selected ? "border-primary" : "border-white/25"
                      }`}
                    >
                      {selected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                    </span>
                  </label>
                );
              })}
            </div>

            {confirming && chosen ? (
              <div className="mt-4 rounded-lg border border-primary/40 bg-primary/[0.06] p-4">
                <p className="text-sm font-semibold text-foreground">{chosen.label} को वोट दें?</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  इस पोल में आप सिर्फ़ एक बार वोट कर सकते हैं, और वोट बाद में बदला नहीं जा सकता।
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button className="gap-2" onClick={() => void castVote()}>
                    {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Check className="h-4 w-4" aria-hidden="true" />}
                    हाँ, वोट पक्का करें
                  </Button>
                  <Button variant="ghost" onClick={() => setConfirming(false)}>
                    चुनाव बदलें
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                size="lg"
                variant={chosen ? "default" : "secondary"}
                className="mt-4 w-full"
                disabled={!chosen}
                onClick={() => setConfirming(true)}
              >
                {chosen ? `${chosen.label} को वोट दें` : "वोट देने के लिए किसी एक को चुनें"}
              </Button>
            )}
          </fieldset>
        ) : (
          <>
            {myOption && (
              <div className="mb-5 flex items-center gap-3 rounded-lg bg-emerald-500/10 px-4 py-3 ring-1 ring-inset ring-emerald-500/25">
                <CircleCheck className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-emerald-200">आपका वोट दर्ज हो गया है</p>
                  <p className="truncate text-xs text-emerald-200/70">आपने {myOption.label} को वोट दिया</p>
                </div>
              </div>
            )}
            <PollResults poll={poll} />
          </>
        )}
        {message && <p className="mt-4 text-sm text-yellow-300">{message}</p>}
      </div>

      <PollFooter poll={poll} />
    </article>
  );
}

function SectionHeading({ title, count }: { title: string; count: number }) {
  return (
    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
      {title}
      <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium tabular-nums text-muted-foreground">{count}</span>
    </h2>
  );
}

function PollSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-border bg-card p-6" aria-hidden="true">
      <div className="h-6 w-16 rounded-full bg-white/[0.06]" />
      <div className="mt-4 h-6 w-2/3 rounded bg-white/[0.06]" />
      <div className="mt-6 space-y-2">
        {[0, 1, 2].map((row) => (
          <div key={row} className="h-14 rounded-lg bg-white/[0.04]" />
        ))}
      </div>
    </div>
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
      <div className="space-y-4" role="status" aria-label="पोल लोड हो रहे हैं">
        <PollSkeleton />
        <PollSkeleton />
      </div>
    );
  }

  const live = polls.filter((poll) => poll.isOpen);
  const past = polls.filter((poll) => !poll.isOpen);

  return (
    <div className="space-y-10">
      {error && <Notice tone="error">{error}</Notice>}

      <section>
        <SectionHeading title="चालू पोल" count={live.length} />
        {live.length ? (
          <div className="space-y-4">
            {live.map((poll) => (
              <PollCard key={poll.id} poll={poll} onChanged={loadPolls} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border px-6 py-12 text-center">
            <Inbox className="h-8 w-8 text-muted-foreground/60" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium text-foreground">अभी कोई चालू पोल नहीं है</p>
            <p className="mt-1 text-sm text-muted-foreground">नया पोल शुरू होते ही यहाँ दिखेगा।</p>
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section>
          <SectionHeading title="पुराने पोल" count={past.length} />
          <div className="space-y-4">
            {past.map((poll) => (
              <PollCard key={poll.id} poll={poll} onChanged={loadPolls} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

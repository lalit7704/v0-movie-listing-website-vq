"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Loader2, Lock, LockOpen, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Notice } from "@/components/admin/notice";
import { PollResults, PollStatus } from "@/components/vote/poll-results";
import { errorText, formatDateTime, voteRequest } from "@/components/vote/vote-api";
import type { PollView } from "@/lib/vote/types";

const MAX_OPTIONS = 10;

type Message = { tone: "success" | "error"; text: string } | null;

export function VoteAdminPolls() {
  const [polls, setPolls] = useState<PollView[] | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [endsAt, setEndsAt] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<Message>(null);

  const loadPolls = useCallback(async () => {
    try {
      const data = await voteRequest<{ polls: PollView[]; totalUsers: number }>("/api/vote/admin/polls");
      setPolls(data.polls);
      setTotalUsers(data.totalUsers);
    } catch (caught) {
      setMessage({ tone: "error", text: errorText(caught) });
    }
  }, []);

  useEffect(() => {
    void loadPolls();
  }, [loadPolls]);

  /** Runs a change, shows its outcome and reloads the list. */
  async function run(action: () => Promise<unknown>, success: string) {
    setBusy(true);
    setMessage(null);
    try {
      await action();
      setMessage({ tone: "success", text: success });
      await loadPolls();
      return true;
    } catch (caught) {
      setMessage({ tone: "error", text: errorText(caught) });
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const created = await run(
      () =>
        voteRequest("/api/vote/admin/polls", "POST", {
          question,
          description,
          options,
          // datetime-local has no time zone; the browser reads it as local time.
          endsAt: endsAt ? new Date(endsAt).toISOString() : "",
        }),
      "Poll created. Voters can see it now."
    );
    if (created) {
      setQuestion("");
      setDescription("");
      setOptions(["", ""]);
      setEndsAt("");
    }
  }

  function setStatus(poll: PollView, status: "open" | "closed") {
    void run(
      () => voteRequest(`/api/vote/admin/polls?id=${encodeURIComponent(poll.id)}`, "PATCH", { status }),
      status === "open" ? "Poll reopened." : "Poll closed. Voters now see the final result."
    );
  }

  function remove(poll: PollView) {
    if (!window.confirm(`Delete "${poll.question}" and all its votes?`)) return;
    void run(() => voteRequest(`/api/vote/admin/polls?id=${encodeURIComponent(poll.id)}`, "DELETE"), "Poll deleted.");
  }

  const stats = [
    { label: "Polls", value: polls?.length ?? 0 },
    { label: "Open", value: polls?.filter((poll) => poll.isOpen).length ?? 0 },
    { label: "Votes", value: polls?.reduce((sum, poll) => sum + (poll.totalVotes ?? 0), 0) ?? 0 },
    { label: "Accounts", value: totalUsers },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {message && <Notice tone={message.tone}>{message.text}</Notice>}

      <form onSubmit={handleCreate} className="rounded-lg border border-border bg-card p-4 sm:p-5">
        <h2 className="mb-4 text-base font-semibold text-foreground">Create a poll</h2>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="poll-question">Question *</Label>
            <Input
              id="poll-question"
              required
              minLength={3}
              maxLength={200}
              placeholder="Which movie should we add next?"
              value={question}
              disabled={busy}
              onChange={(event) => setQuestion(event.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="poll-description">Details</Label>
            <Textarea
              id="poll-description"
              maxLength={500}
              rows={2}
              value={description}
              disabled={busy}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Options * (2 to {MAX_OPTIONS})</Label>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  required={index < 2}
                  maxLength={120}
                  placeholder={`Option ${index + 1}`}
                  aria-label={`Option ${index + 1}`}
                  value={option}
                  disabled={busy}
                  onChange={(event) =>
                    setOptions((current) => current.map((value, i) => (i === index ? event.target.value : value)))
                  }
                />
                {options.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={busy}
                    aria-label={`Remove option ${index + 1}`}
                    onClick={() => setOptions((current) => current.filter((_, i) => i !== index))}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
            ))}
            {options.length < MAX_OPTIONS && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={busy}
                onClick={() => setOptions((current) => [...current, ""])}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add option
              </Button>
            )}
          </div>
          <div className="space-y-1.5 sm:max-w-xs">
            <Label htmlFor="poll-ends">Voting ends (optional)</Label>
            <Input
              id="poll-ends"
              type="datetime-local"
              value={endsAt}
              disabled={busy}
              onChange={(event) => setEndsAt(event.target.value)}
            />
            <p className="text-xs text-muted-foreground">Leave empty to keep it open until you close it.</p>
          </div>
        </div>
        <Button type="submit" className="mt-5 gap-2" disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
          Create poll
        </Button>
      </form>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">All polls</h2>
        {polls === null ? (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-label="Loading polls" />
        ) : polls.length === 0 ? (
          <p className="text-sm text-muted-foreground">No polls yet. Create the first one above.</p>
        ) : (
          polls.map((poll) => (
            <article key={poll.id} className="rounded-lg border border-border bg-card p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <PollStatus poll={poll} />
                  <h3 className="mt-2 text-base font-semibold text-foreground">{poll.question}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Created {formatDateTime(poll.createdAt)}
                    {poll.createdBy ? ` by ${poll.createdBy}` : ""}
                  </p>
                </div>
                <div className="flex gap-1">
                  {poll.isOpen ? (
                    <Button variant="outline" size="sm" className="gap-1.5" disabled={busy} onClick={() => setStatus(poll, "closed")}>
                      <Lock className="h-4 w-4" aria-hidden="true" />
                      Close
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="gap-1.5" disabled={busy} onClick={() => setStatus(poll, "open")}>
                      <LockOpen className="h-4 w-4" aria-hidden="true" />
                      Reopen
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={busy}
                    onClick={() => remove(poll)}
                    aria-label={`Delete ${poll.question}`}
                    title="Delete poll"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" aria-hidden="true" />
                  </Button>
                </div>
              </div>
              {poll.description && (
                <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{poll.description}</p>
              )}
              <div className="mt-4">
                <PollResults poll={poll} />
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

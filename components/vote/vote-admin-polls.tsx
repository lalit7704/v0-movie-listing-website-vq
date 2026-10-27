"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { BarChart3, Loader2, Lock, LockOpen, Plus, Radio, Trash2, Users, Vote, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Notice } from "@/components/admin/notice";
import { PollFooter, PollResults, PollStatus } from "@/components/vote/poll-results";
import { PollVoters } from "@/components/vote/poll-voters";
import { OptionAvatar } from "@/components/vote/vote-ui";
import { errorText, formatDateTime, voteRequest } from "@/components/vote/vote-api";
import type { PollView } from "@/lib/vote/types";

const MAX_OPTIONS = 10;

type Message = { tone: "success" | "error"; text: string } | null;

/** isOwner adds each poll's voter list, which shows phone numbers. */
export function VoteAdminPolls({ isOwner }: { isOwner: boolean }) {
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
      "पोल बन गया। वोटर अब इसे देख सकते हैं।"
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
      status === "open" ? "पोल दोबारा खोल दिया गया।" : "पोल बंद हो गया। वोटर अब अंतिम नतीजा देखेंगे।"
    );
  }

  function remove(poll: PollView) {
    if (!window.confirm(`"${poll.question}" और इसके सारे वोट हटाएँ?`)) return;
    void run(() => voteRequest(`/api/vote/admin/polls?id=${encodeURIComponent(poll.id)}`, "DELETE"), "पोल हटा दिया गया।");
  }

  const stats = [
    { label: "कुल पोल", value: polls?.length ?? 0, icon: BarChart3 },
    { label: "अभी चालू", value: polls?.filter((poll) => poll.isOpen).length ?? 0, icon: Radio },
    { label: "कुल वोट", value: polls?.reduce((sum, poll) => sum + (poll.totalVotes ?? 0), 0) ?? 0, icon: Vote },
    { label: "कुल वोटर", value: totalUsers, icon: Users },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="flex items-center justify-between text-muted-foreground">
              <p className="text-xs font-medium">{label}</p>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>
            <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight text-foreground">
              {value.toLocaleString("hi-IN")}
            </p>
          </div>
        ))}
      </div>

      {message && <Notice tone={message.tone}>{message.text}</Notice>}

      <form onSubmit={handleCreate} className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4 sm:px-6">
          <h2 className="text-base font-semibold text-foreground">नया पोल</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">पब्लिश करते ही वोटरों को दिखेगा।</p>
        </div>
        <div className="space-y-5 p-5 sm:p-6">
          <div className="space-y-1.5">
            <Label htmlFor="poll-question">सवाल</Label>
            <Input
              id="poll-question"
              required
              minLength={3}
              maxLength={200}
              placeholder="अगला सरपंच कौन होना चाहिए?"
              className="h-11"
              value={question}
              disabled={busy}
              onChange={(event) => setQuestion(event.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="poll-description">
              जानकारी <span className="font-normal text-muted-foreground">(वैकल्पिक)</span>
            </Label>
            <Textarea
              id="poll-description"
              maxLength={500}
              rows={2}
              placeholder="नियम या वोटरों के लिए ज़रूरी बात"
              value={description}
              disabled={busy}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>
              विकल्प <span className="font-normal text-muted-foreground">(2 से {MAX_OPTIONS})</span>
            </Label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <OptionAvatar label={option || String(index + 1)} index={index} size="sm" />
                <Input
                  required={index < 2}
                  maxLength={120}
                  placeholder={`विकल्प ${index + 1}`}
                  aria-label={`विकल्प ${index + 1}`}
                  className="h-10"
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
                    aria-label={`विकल्प ${index + 1} हटाएँ`}
                    onClick={() => setOptions((current) => current.filter((_, i) => i !== index))}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
            ))}
            {options.length < MAX_OPTIONS && (
              <button
                type="button"
                disabled={busy}
                onClick={() => setOptions((current) => [...current, ""])}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border py-2.5 text-sm text-muted-foreground transition-colors hover:border-white/25 hover:text-foreground disabled:opacity-50"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                विकल्प जोड़ें
              </button>
            )}
          </div>
          <div className="space-y-1.5 sm:max-w-xs">
            <Label htmlFor="poll-ends">
              बंद होने का समय <span className="font-normal text-muted-foreground">(वैकल्पिक)</span>
            </Label>
            <Input
              id="poll-ends"
              type="datetime-local"
              className="h-10"
              value={endsAt}
              disabled={busy}
              onChange={(event) => setEndsAt(event.target.value)}
            />
            <p className="text-xs text-muted-foreground">खाली छोड़ें तो पोल तब तक खुला रहेगा जब तक आप इसे बंद न करें।</p>
          </div>
        </div>
        <div className="flex justify-end border-t border-border bg-white/[0.015] px-5 py-3 sm:px-6">
          <Button type="submit" className="gap-2" disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
            पोल पब्लिश करें
          </Button>
        </div>
      </form>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          सभी पोल
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium tabular-nums text-muted-foreground">
            {polls?.length ?? 0}
          </span>
        </h2>
        {polls === null ? (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-label="पोल लोड हो रहे हैं" />
        ) : polls.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border px-6 py-10 text-center text-sm text-muted-foreground">
            अभी कोई पोल नहीं है। ऊपर से पहला पोल पब्लिश करें।
          </p>
        ) : (
          <div className="space-y-4">
            {polls.map((poll) => (
              <article key={poll.id} className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex flex-wrap items-start justify-between gap-3 p-5 sm:p-6">
                  <div className="min-w-0 flex-1">
                    <PollStatus poll={poll} onEnd={() => void loadPolls()} />
                    <h3 className="mt-3 text-lg font-semibold text-foreground">{poll.question}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      बनाया: {formatDateTime(poll.createdAt)}
                      {poll.createdBy ? ` · ${poll.createdBy}` : ""}
                    </p>
                    {poll.description && (
                      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{poll.description}</p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {poll.isOpen ? (
                      <Button variant="outline" size="sm" className="gap-1.5" disabled={busy} onClick={() => setStatus(poll, "closed")}>
                        <Lock className="h-4 w-4" aria-hidden="true" />
                        वोटिंग बंद करें
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="gap-1.5" disabled={busy} onClick={() => setStatus(poll, "open")}>
                        <LockOpen className="h-4 w-4" aria-hidden="true" />
                        दोबारा खोलें
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={busy}
                      onClick={() => remove(poll)}
                      aria-label={`${poll.question} हटाएँ`}
                      title="पोल हटाएँ"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
                <div className="border-t border-border p-5 sm:p-6">
                  <PollResults poll={poll} />
                  {isOwner && <PollVoters poll={poll} />}
                </div>
                <PollFooter poll={poll} />
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

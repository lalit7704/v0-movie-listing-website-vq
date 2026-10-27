"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { BadgeCheck, Check, Loader2, LogOut, Pencil, Settings, X } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notice } from "@/components/admin/notice";
import { VoteAuth } from "@/components/vote/vote-auth";
import { VotePolls } from "@/components/vote/vote-polls";
import { CAMPAIGN, Eyebrow, PersonAvatar } from "@/components/vote/vote-ui";
import { errorText, useVoteSession, voteRequest } from "@/components/vote/vote-api";
import type { VoteUser } from "@/lib/vote/types";

const roleLabels = { owner: "मुख्य एडमिन", manager: "मैनेजर", voter: "वेरिफ़ाइड वोटर" };

/**
 * The signed-in voter: name with a pencil to change it, role, admin link and logout.
 * The phone stays hidden here so it does not show on screen.
 */
function AccountCard({
  user,
  onSaved,
  onSignOut,
}: {
  user: VoteUser;
  onSaved: (user: VoteUser) => void;
  onSignOut: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const data = await voteRequest<{ user: VoteUser }>("/api/vote/session", "PATCH", { name });
      onSaved(data.user);
      setEditing(false);
    } catch (caught) {
      setMessage(errorText(caught));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full sm:w-auto">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card py-2.5 pl-3 pr-2">
        <PersonAvatar name={user.name} size="lg" />
        <div className="min-w-0 flex-1">
          {editing ? (
            <form onSubmit={handleSave} className="flex items-center gap-1">
              <Input
                aria-label="आपका नाम"
                autoFocus
                required
                minLength={2}
                maxLength={60}
                value={name}
                disabled={busy}
                onChange={(event) => setName(event.target.value)}
                onKeyDown={(event) => event.key === "Escape" && setEditing(false)}
                className="h-8 w-40"
              />
              <Button type="submit" size="icon" className="h-8 w-8" disabled={busy} aria-label="नाम सेव करें">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Check className="h-4 w-4" aria-hidden="true" />}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={busy}
                aria-label="रद्द करें"
                onClick={() => setEditing(false)}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
          ) : (
            <p className="flex items-center gap-1 text-sm font-semibold text-foreground">
              <span className="truncate">{user.name}</span>
              <button
                type="button"
                className="rounded p-1 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                aria-label="नाम बदलें"
                title="नाम बदलें"
                onClick={() => {
                  setName(user.name);
                  setMessage(null);
                  setEditing(true);
                }}
              >
                <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </p>
          )}
          <p className="mt-0.5 flex items-center gap-1 text-xs text-emerald-300/90">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {roleLabels[user.role]}
          </p>
        </div>
        <div className="flex items-center gap-1 pl-2">
          {user.role !== "voter" && (
            <Button asChild variant="secondary" size="sm" className="gap-1.5">
              <Link href="/vote/admin">
                <Settings className="h-4 w-4" aria-hidden="true" />
                मैनेज करें
              </Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" aria-label="लॉग आउट" title="लॉग आउट" onClick={onSignOut}>
            <LogOut className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
      {message && <p className="mt-2 text-sm text-yellow-300">{message}</p>}
    </div>
  );
}

export function VotePage() {
  const { state, setUser, signOut } = useVoteSession();

  let content;
  if (state.status === "loading") {
    content = (
      <div className="flex justify-center py-24 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" aria-label="लोड हो रहा है" />
      </div>
    );
  } else if (state.status === "error") {
    content = <Notice tone="error">{state.message}</Notice>;
  } else if (!state.user) {
    content = <VoteAuth audience="voter" onSignedIn={setUser} />;
  } else {
    content = (
      <>
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>{CAMPAIGN.eyebrow}</Eyebrow>
            <h1 className="mt-2 text-3xl font-bold leading-tight text-foreground sm:text-4xl">{CAMPAIGN.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">एक व्यक्ति, एक वोट। नतीजे तुरंत अपडेट होते हैं।</p>
          </div>
          <AccountCard user={state.user} onSaved={setUser} onSignOut={() => void signOut()} />
        </header>
        <VotePolls />
      </>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div lang="hi" className="mx-auto min-h-[78vh] max-w-3xl px-4 pb-20 pt-24 sm:px-6 sm:pt-28">{content}</div>
      <Footer />
    </main>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Loader2, LogOut, Pencil, Settings } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notice } from "@/components/admin/notice";
import { VoteAuth } from "@/components/vote/vote-auth";
import { VotePolls } from "@/components/vote/vote-polls";
import { errorText, useVoteSession, voteRequest } from "@/components/vote/vote-api";
import type { VoteUser } from "@/lib/vote/types";

/** "Hi name" with a pencil to change the name. The phone stays hidden here so it does not show on screen. */
function VoterGreeting({ user, onSaved }: { user: VoteUser; onSaved: (user: VoteUser) => void }) {
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

  if (!editing) {
    return (
      <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
        Hi {user.name}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          aria-label="Edit name"
          title="Edit name"
          onClick={() => {
            setName(user.name);
            setMessage(null);
            setEditing(true);
          }}
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      </p>
    );
  }

  return (
    <form onSubmit={handleSave} className="mt-2 space-y-1.5">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          aria-label="Your name"
          autoFocus
          required
          minLength={2}
          maxLength={60}
          value={name}
          disabled={busy}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => event.key === "Escape" && setEditing(false)}
          className="h-8 w-56"
        />
        <Button type="submit" size="sm" className="gap-1.5" disabled={busy}>
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Check className="h-4 w-4" aria-hidden="true" />
          )}
          Save
        </Button>
        <Button type="button" variant="ghost" size="sm" disabled={busy} onClick={() => setEditing(false)}>
          Cancel
        </Button>
      </div>
      {message &&<p className="text-sm text-yellow-300">{message}</p>}
    </form>
  );
}

export function VotePage() {
  const { state, setUser, signOut } = useVoteSession();

  let content;
  if (state.status === "loading") {
    content = (
      <div className="flex justify-center py-24 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" aria-label="Loading" />
      </div>
    );
  } else if (state.status === "error") {
    content = <Notice tone="error">{state.message}</Notice>;
  } else if (!state.user) {
    content = <VoteAuth heading="Vote" onSignedIn={setUser} />;
  } else {
    const { user } = state;
    content = (
      <>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Vote</h1>
            <VoterGreeting user={user} onSaved={setUser} />
          </div>
          <div className="flex flex-wrap gap-2">
            {user.role !== "voter" && (
              <Button asChild variant="secondary" size="sm" className="gap-2">
                <Link href="/vote/admin">
                  <Settings className="h-4 w-4" aria-hidden="true" />
                  Manage voting
                </Link>
              </Button>
            )}
            <Button variant="outline" size="sm" className="gap-2" onClick={() => void signOut()}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </Button>
          </div>
        </div>
        <VotePolls />
      </>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto min-h-[78vh] max-w-3xl px-4 pb-16 pt-24 sm:px-6">{content}</div>
      <Footer />
    </main>
  );
}

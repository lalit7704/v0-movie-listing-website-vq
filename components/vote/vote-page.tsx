"use client";

import Link from "next/link";
import { Loader2, LogOut, Settings } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/admin/notice";
import { VoteAuth } from "@/components/vote/vote-auth";
import { VotePolls } from "@/components/vote/vote-polls";
import { useVoteSession } from "@/components/vote/vote-api";
import { formatPhone } from "@/lib/vote/phone";

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
            <p className="mt-1 text-sm text-muted-foreground">
              Hi {user.name} · {formatPhone(user.phone)}
            </p>
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

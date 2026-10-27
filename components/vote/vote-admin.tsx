"use client";

import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Loader2, LogOut, ShieldAlert, Users, Vote } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Notice } from "@/components/admin/notice";
import { VoteAuth } from "@/components/vote/vote-auth";
import { VoteAdminPolls } from "@/components/vote/vote-admin-polls";
import { VoteAdminTeam } from "@/components/vote/vote-admin-team";
import { Eyebrow, PersonAvatar } from "@/components/vote/vote-ui";
import { useVoteSession } from "@/components/vote/vote-api";
import { formatPhone } from "@/lib/vote/phone";

export function VoteAdmin() {
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
    content = <VoteAuth audience="admin" onSignedIn={setUser} />;
  } else if (state.user.role === "voter") {
    content = (
      <section className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-6 text-center sm:p-10">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 ring-1 ring-inset ring-red-500/25">
          <ShieldAlert className="h-6 w-6 text-red-400" aria-hidden="true" />
        </span>
        <h1 className="text-xl font-bold tracking-tight text-foreground">No admin access</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {formatPhone(state.user.phone)} cannot manage voting. Ask the owner to add this number as a manager.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button asChild variant="secondary">
            <Link href="/vote">Go to voting</Link>
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => void signOut()}>
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </Button>
        </div>
      </section>
    );
  } else {
    const { user } = state;
    content = (
      <>
        <header className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Voting admin</Eyebrow>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card py-2.5 pl-3 pr-2">
            <PersonAvatar name={user.name} size="lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-emerald-300/90">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {user.role === "owner" ? "Owner" : "Manager"}
              </p>
            </div>
            <div className="flex items-center gap-1 pl-2">
              <Button asChild variant="secondary" size="sm" className="gap-1.5">
                <Link href="/vote">
                  Voting page
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" aria-label="Log out" title="Log out" onClick={() => void signOut()}>
                <LogOut className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </header>

        <Tabs defaultValue="polls" className="gap-6">
          <TabsList className="w-full sm:w-fit">
            <TabsTrigger value="polls" className="gap-2">
              <Vote className="h-4 w-4" aria-hidden="true" />
              Polls
            </TabsTrigger>
            {user.role === "owner" && (
              <TabsTrigger value="team" className="gap-2">
                <Users className="h-4 w-4" aria-hidden="true" />
                Managers
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="polls">
            <VoteAdminPolls isOwner={user.role === "owner"} />
          </TabsContent>
          {user.role === "owner" && (
            <TabsContent value="team">
              <VoteAdminTeam />
            </TabsContent>
          )}
        </Tabs>
      </>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto min-h-[78vh] max-w-4xl px-4 pb-20 pt-24 sm:px-6 sm:pt-28">{content}</div>
      <Footer />
    </main>
  );
}

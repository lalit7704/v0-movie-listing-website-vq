"use client";

import Link from "next/link";
import { ExternalLink, Loader2, LogOut, ShieldAlert, Users, Vote } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Notice } from "@/components/admin/notice";
import { VoteAuth } from "@/components/vote/vote-auth";
import { VoteAdminPolls } from "@/components/vote/vote-admin-polls";
import { VoteAdminTeam } from "@/components/vote/vote-admin-team";
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
    content = <VoteAuth heading="Voting Admin" onSignedIn={setUser} />;
  } else if (state.user.role === "voter") {
    content = (
      <section className="mx-auto max-w-lg rounded-lg border border-border bg-card p-6 text-center sm:p-8">
        <ShieldAlert className="mx-auto mb-4 h-10 w-10 text-red-400" aria-hidden="true" />
        <h1 className="text-xl font-bold text-foreground">No admin access</h1>
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
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Voting Admin</h1>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {user.name} · {formatPhone(user.phone)}
              <Badge variant={user.role === "owner" ? "default" : "secondary"}>
                {user.role === "owner" ? "Owner" : "Manager"}
              </Badge>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="secondary" size="sm" className="gap-2">
              <Link href="/vote">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Voting page
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => void signOut()}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </Button>
          </div>
        </div>

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
      <div className="mx-auto min-h-[78vh] max-w-4xl px-4 pb-16 pt-24 sm:px-6">{content}</div>
      <Footer />
    </main>
  );
}

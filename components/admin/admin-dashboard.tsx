"use client";

import { useEffect, useState } from "react";
import { Film, Loader2, LogOut, ShieldAlert, Send, Users } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/auth-provider";
import { AdminLogin } from "@/components/admin/admin-login";
import { MovieForm } from "@/components/admin/movie-form";
import { AdminUsers } from "@/components/admin/admin-users";
import { TelegramTools } from "@/components/admin/telegram-tools";
import { Notice } from "@/components/admin/notice";

interface AdminAccess {
  email: string;
  role: "owner" | "editor";
  githubReady: boolean;
  usersReady: boolean;
}

type AccessState =
  | { status: "checking" }
  | { status: "denied" }
  | { status: "error"; message: string }
  | ({ status: "allowed" } & AdminAccess);

export function AdminDashboard() {
  const { user, isLoading, isConfigured, signOut } = useAuth();
  const [access, setAccess] = useState<AccessState>({ status: "checking" });
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    setAccess({ status: "checking" });

    fetch("/api/admin/session", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (cancelled) return;
        if (response.ok && data.success) setAccess({ status: "allowed", ...(data as AdminAccess) });
        else if (response.status === 403) setAccess({ status: "denied" });
        else setAccess({ status: "error", message: data.error || "Could not check access" });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setAccess({ status: "error", message: error instanceof Error ? error.message : "Network error" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  let content;
  if (!isConfigured) {
    content = (
      <Notice tone="warning">
        Supabase keys are missing, so admin login cannot work. Add NEXT_PUBLIC_SUPABASE_URL and
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
      </Notice>
    );
  } else if (isLoading || (user && access.status === "checking")) {
    content = (
      <div className="flex justify-center py-24 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" aria-label="Loading" />
      </div>
    );
  } else if (!user) {
    content = <AdminLogin />;
  } else if (access.status !== "allowed") {
    content = (
      <section className="mx-auto max-w-lg rounded-lg border border-border bg-card p-6 text-center sm:p-8">
        <ShieldAlert className="mx-auto mb-4 h-10 w-10 text-red-400" aria-hidden="true" />
        <h1 className="text-xl font-bold text-foreground">
          {access.status === "denied" ? "No admin access" : "Could not check access"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {access.status === "error"
            ? access.message
            : `${user.email} is not allowed into the admin panel. Ask the owner to add this email.`}
        </p>
        <Button variant="outline" className="mt-6 gap-2" onClick={() => void signOut()}>
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign out
        </Button>
      </section>
    );
  } else {
    content = (
      <>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Admin Panel</h1>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {access.email}
              <Badge variant={access.role === "owner" ? "default" : "secondary"}>
                {access.role === "owner" ? "Owner" : "Editor"}
              </Badge>
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => void signOut()}>
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </Button>
        </div>

        <Tabs defaultValue="movie" className="gap-6">
          <TabsList className="w-full sm:w-fit">
            <TabsTrigger value="movie" className="gap-2">
              <Film className="h-4 w-4" aria-hidden="true" />
              Add Movie
            </TabsTrigger>
            <TabsTrigger value="telegram" className="gap-2">
              <Send className="h-4 w-4" aria-hidden="true" />
              Telegram
            </TabsTrigger>
            {access.role === "owner" && (
              <TabsTrigger value="users" className="gap-2">
                <Users className="h-4 w-4" aria-hidden="true" />
                Users
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="movie">
            {!access.githubReady && (
              <Notice tone="warning">
                GITHUB_TOKEN is not set on the server, so new movies cannot be pushed yet.
              </Notice>
            )}
            <MovieForm />
          </TabsContent>
          <TabsContent value="telegram">
            <TelegramTools />
          </TabsContent>
          {access.role === "owner" && (
            <TabsContent value="users">
              {access.usersReady ? (
                <AdminUsers />
              ) : (
                <Notice tone="warning">
                  SUPABASE_SERVICE_ROLE_KEY is not set on the server, so users cannot be managed yet.
                </Notice>
              )}
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

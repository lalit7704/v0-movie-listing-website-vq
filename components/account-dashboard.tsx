"use client";

import {
  UserRound,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";

export function AccountDashboard() {
  const {
    user,
    isLoading,
    isConfigured,
    signInWithGoogle,
  } = useAuth();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-[1400px] px-4 pt-28 text-muted-foreground">
          Loading your account...
        </div>
      </main>
    );
  }

  if (!isConfigured || !user) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto flex min-h-[75vh] max-w-lg flex-col items-center justify-center px-4 pt-20 text-center">
          <UserRound className="mb-4 h-12 w-12 text-muted-foreground" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-foreground">
            {isConfigured ? "Login required" : "Login setup is incomplete"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isConfigured
              ? "Login to open your synced wishlist, history, and movie requests."
              : "Add your Supabase project keys to enable user accounts."}
          </p>
          {isConfigured && (
            <Button className="mt-6" onClick={() => void signInWithGoogle()}>
              Continue with Google
            </Button>
          )}
        </div>
        <Footer />
      </main>
    );
  }
}

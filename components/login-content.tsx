"use client";

import Link from "next/link";
import { Check, Cloud, Heart, History, LogIn } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";

const benefits = [
  { icon: Heart, text: "Sync your wishlist across devices" },
  { icon: History, text: "Continue watching from where you stopped" },
  { icon: Cloud, text: "Keep requests and preferences in your account" },
];

export function LoginContent() {
  const { user, isLoading, isConfigured, signInWithGoogle } = useAuth();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto flex min-h-[78vh] max-w-lg items-center px-4 pb-16 pt-24 sm:px-6">
        <section className="w-full rounded-lg border border-border bg-card p-6 shadow-xl sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Login to Onemovie</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Browsing stays free. Login only saves your personal movie activity.
            </p>
          </div>

          <div className="mb-6 space-y-3">
            {benefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-foreground">
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {!isConfigured ? (
            <div className="rounded-md border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-200">
              Login code is ready. Add the Supabase project URL and publishable key to enable it.
            </div>
          ) : user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-green-400">
                <Check className="h-4 w-4" aria-hidden="true" />
                You are logged in as {user.email}
              </div>
              <Button asChild className="w-full">
                <Link href="/account">Open My Account</Link>
              </Button>
            </div>
          ) : (
            <Button
              className="w-full gap-2"
              disabled={isLoading}
              onClick={() => void signInWithGoogle()}
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              {isLoading ? "Checking session..." : "Continue with Google"}
            </Button>
          )}

          <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link href="/terms-of-service" className="text-foreground hover:text-primary">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-foreground hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
}

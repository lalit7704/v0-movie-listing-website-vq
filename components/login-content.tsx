"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function LoginContent() {
  // Login functionality has been removed.
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto flex min-h-[78vh] max-w-lg items-center px-4 pb-16 pt-24 sm:px-6">
        <section className="w-full rounded-lg border border-border bg-card p-6 text-center shadow-xl sm:p-8">
          <h1 className="text-2xl font-bold text-foreground">Login Disabled</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">User accounts and login functionality have been removed from this application.</p>
        </section>
      </div>
      <Footer />
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "onemovie-adult-confirmed";

/**
 * Covers the page until the visitor confirms they are 18 or older.
 * The answer is remembered on this device, so it is asked only once.
 */
export function AdultAgeGate() {
  // null until the saved answer has been read, so the page starts covered.
  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setConfirmed(localStorage.getItem(STORAGE_KEY) === "yes");
    } catch {
      setConfirmed(false);
    }
  }, []);

  if (confirmed) return null;

  const confirm = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "yes");
    } catch {
      // Private mode or blocked storage: let them in for this visit only.
    }
    setConfirmed(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl px-4"
    >
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-2xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-xl font-bold text-primary">
          18+
        </div>
        <h2 id="age-gate-title" className="text-2xl font-bold text-foreground">
          Adults only
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          This section contains adult content. You must be 18 or older to enter.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button className="flex-1" onClick={confirm}>
            I am 18 or older
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/">Leave</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import type { VoteUser } from "@/lib/vote/types";

/** Calls an /api/vote route and returns its JSON, or throws with the route's error message. */
export async function voteRequest<T = Record<string, unknown>>(url: string, method = "GET", body?: unknown): Promise<T> {
  const response = await fetch(url, {
    method,
    cache: "no-store",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json().catch(() => null);
  if (!data?.success) throw new Error(data?.error || `Request failed (${response.status})`);
  return data as T;
}

export function errorText(caught: unknown) {
  return caught instanceof Error ? caught.message : "Network error";
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

type SessionState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; user: VoteUser | null };

/** The voting login, which is separate from the site's own login. */
export function useVoteSession() {
  const [state, setState] = useState<SessionState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    voteRequest<{ user: VoteUser | null }>("/api/vote/session")
      .then((data) => !cancelled && setState({ status: "ready", user: data.user }))
      .catch((caught: unknown) => !cancelled && setState({ status: "error", message: errorText(caught) }));
    return () => {
      cancelled = true;
    };
  }, []);

  const setUser = useCallback((user: VoteUser) => setState({ status: "ready", user }), []);

  const signOut = useCallback(async () => {
    await fetch("/api/vote/session", { method: "DELETE" }).catch(() => null);
    setState({ status: "ready", user: null });
  }, []);

  return { state, setUser, signOut };
}

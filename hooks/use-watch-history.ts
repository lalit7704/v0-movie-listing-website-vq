"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import {
  WATCH_HISTORY_EVENT,
  WATCH_HISTORY_KEY,
  readLocalWatchHistory,
  type WatchHistoryEntry,
} from "@/lib/watch-history";

export function useWatchHistory() {
  const { user, supabase, isLoading: isAuthLoading } = useAuth();
  const [history, setHistory] = useState<WatchHistoryEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadLocal = useCallback(() => {
    setHistory(readLocalWatchHistory());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    loadLocal();
    const handleStorage = (event: StorageEvent) => {
      if (event.key === WATCH_HISTORY_KEY) loadLocal();
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener(WATCH_HISTORY_EVENT, loadLocal);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(WATCH_HISTORY_EVENT, loadLocal);
    };
  }, [loadLocal]);

  useEffect(() => {
    // Supabase sync logic removed
  }, [isAuthLoading, supabase, user]);

  return { history, isLoaded };
}

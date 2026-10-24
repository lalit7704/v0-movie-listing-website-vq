"use client";

import { useEffect, useRef, useState } from "react";
import { Timer } from "lucide-react";
import { formatDateTime } from "@/components/vote/vote-api";

const URGENT_MS = 60 * 60_000;

/** 2d 04h 13m 22s, dropping leading units that are zero. */
function formatTimeLeft(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const units = [
    [Math.floor(totalSeconds / 86_400), "d"],
    [Math.floor((totalSeconds % 86_400) / 3600), "h"],
    [Math.floor((totalSeconds % 3600) / 60), "m"],
    [totalSeconds % 60, "s"],
  ] as const;
  const first = units.findIndex(([value]) => value > 0);
  return units
    .slice(first === -1 ? 3 : first)
    .map(([value, unit], index) => `${index === 0 ? value : String(value).padStart(2, "0")}${unit}`)
    .join(" ");
}

/**
 * Highlighted live time left until a poll closes; red with a blinking dot in the last hour.
 * onEnd runs shortly after zero so the list can reload and show the poll as closed.
 */
export function PollCountdown({ endsAt, onEnd }: { endsAt: string; onEnd?: () => void }) {
  const [now, setNow] = useState(() => Date.now());
  const onEndRef = useRef(onEnd);
  const left = new Date(endsAt).getTime() - now;
  const ended = left <= 0;
  const urgent = left <= URGENT_MS;

  useEffect(() => {
    onEndRef.current = onEnd;
  });

  useEffect(() => {
    if (ended) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [ended]);

  useEffect(() => {
    if (!ended) return;
    // A little after zero, so the server also counts the poll as closed when the list reloads.
    const timer = setTimeout(() => onEndRef.current?.(), 1500);
    return () => clearTimeout(timer);
  }, [ended]);

  return (
    <span
      role="timer"
      title={`Voting ends ${formatDateTime(endsAt)}`}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm font-semibold tabular-nums ${
        urgent
          ? "border-red-500 bg-red-500/20 text-red-200"
          : "border-yellow-500/40 bg-yellow-500/10 text-yellow-300"
      }`}
    >
      {urgent && !ended ? (
        // Only the dot blinks, so the time itself stays easy to read.
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
        </span>
      ) : (
        <Timer className="h-4 w-4" aria-hidden="true" />
      )}
      {ended ? "Voting has ended" : `Ends in ${formatTimeLeft(left)}`}
    </span>
  );
}

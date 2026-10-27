"use client";

import { useEffect, useRef, useState } from "react";
import { Timer } from "lucide-react";
import { formatDateTime } from "@/components/vote/vote-api";

const URGENT_MS = 60 * 60_000;

/** "2 दिन 04:13:22" or "00:37:47": a clock reads the same in Hindi and English. */
function formatTimeLeft(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86_400);
  const pad = (value: number) => String(value).padStart(2, "0");
  const clock = [
    Math.floor((totalSeconds % 86_400) / 3600),
    Math.floor((totalSeconds % 3600) / 60),
    totalSeconds % 60,
  ]
    .map(pad)
    .join(":");
  return days ? `${days} दिन ${clock}` : clock;
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
      title={`वोटिंग ${formatDateTime(endsAt)} को बंद होगी`}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums ring-1 ring-inset ${
        urgent ? "bg-red-500/15 text-red-200 ring-red-500/50" : "bg-amber-500/10 text-amber-300 ring-amber-500/30"
      }`}
    >
      {urgent && !ended ? (
        // Only the dot blinks, so the time itself stays easy to read.
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
      ) : (
        <Timer className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      {ended ? "वोटिंग खत्म हो गई" : `बंद होने में ${formatTimeLeft(left)}`}
    </span>
  );
}

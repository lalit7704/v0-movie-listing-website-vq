import type { ReactNode } from "react";

const tones = {
  warning: "border-yellow-500/40 bg-yellow-500/10 text-yellow-200",
  error: "border-red-500/40 bg-red-500/10 text-red-200",
  success: "border-green-500/40 bg-green-500/10 text-green-200",
};

export function Notice({ tone, children }: { tone: keyof typeof tones; children: ReactNode }) {
  return <div className={`mb-4 rounded-md border p-4 text-sm leading-relaxed ${tones[tone]}`}>{children}</div>;
}

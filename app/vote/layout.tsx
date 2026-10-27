import type { ReactNode } from "react";
import { Noto_Sans_Devanagari } from "next/font/google";

// The voting pages are in Hindi. The site's own fonts stay first, so English text looks the same as
// everywhere else; Hindi letters fall through to Noto Sans Devanagari, which has real bold weights.
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-vote-hindi",
});

export default function VoteLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={devanagari.variable}
      style={{ fontFamily: "'Inter', 'Inter Fallback', system-ui, var(--font-vote-hindi), sans-serif" }}
    >
      {children}
    </div>
  );
}

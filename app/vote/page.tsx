import type { Metadata } from "next";
import { VotePage } from "@/components/vote/vote-page";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata(
  "/vote",
  "चौखा सरपंच चुनाव – वोट करें",
  "अपने मोबाइल नंबर से अकाउंट बनाएँ और अपने चौखा सरपंच के लिए वोट करें।"
);

export default function Page() {
  return <VotePage />;
}

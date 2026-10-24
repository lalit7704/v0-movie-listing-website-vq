import type { Metadata } from "next";
import { VotePage } from "@/components/vote/vote-page";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata(
  "/vote",
  "Vote",
  "Create an account with your mobile number and vote in Onemovie polls."
);

export default function Page() {
  return <VotePage />;
}

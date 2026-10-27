import type { Metadata } from "next";
import { VoteAdmin } from "@/components/vote/vote-admin";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/vote/admin", "वोटिंग एडमिन", "Onemovie वोटिंग एडमिन।", false);

export default function Page() {
  return <VoteAdmin />;
}

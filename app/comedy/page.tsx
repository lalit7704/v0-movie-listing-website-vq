import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByGenre } from "@/data/videos";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/comedy", "Comedy Movies", "Browse comedy movies and light-hearted entertainment.");

export default function ComedyPage() {
  const videos = getVideosByGenre("Comedy");

  return (
    <CollectionPage
      title="Comedy Movies"
      description="Laugh out loud with our collection of hilarious comedies"
      videos={videos}
      basePath="/comedy"
    />
  );
}

import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByGenre } from "@/data/videos";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/drama", "Drama Movies", "Browse drama movies with powerful stories and emotional journeys.");

export default function DramaPage() {
  const videos = getVideosByGenre("Drama");

  return (
    <CollectionPage
      title="Drama Movies"
      description="Powerful stories and emotional journeys that move you"
      videos={videos}
      basePath="/drama"
    />
  );
}

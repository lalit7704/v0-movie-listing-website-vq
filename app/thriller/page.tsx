import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByGenre } from "@/data/videos";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/thriller", "Thriller Movies", "Browse thriller movies, suspenseful dramas, and gripping mysteries.");

export default function ThrillerPage() {
  const videos = getVideosByGenre("Thriller");

  return (
    <CollectionPage
      title="Thriller Movies"
      description="Edge-of-your-seat suspense that keeps you guessing"
      videos={videos}
      basePath="/thriller"
    />
  );
}

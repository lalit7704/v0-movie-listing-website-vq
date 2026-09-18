import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByGenre } from "@/data/videos";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/sci-fi", "Sci-Fi Movies", "Browse science-fiction movies, space adventures, and futuristic stories.");

export default function SciFiPage() {
  const videos = getVideosByGenre("Sci-Fi");

  return (
    <CollectionPage
      title="Sci-Fi Movies"
      description="Futuristic worlds, space adventures, and mind-bending stories"
      videos={videos}
      basePath="/sci-fi"
    />
  );
}

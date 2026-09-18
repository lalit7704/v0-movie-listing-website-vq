import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByCategory } from "@/data/videos";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/web-series", "Web Series", "Browse web series, original shows, and episodic content.");

export default function WebSeriesPage() {
  const videos = getVideosByCategory("Web Series");

  return (
    <CollectionPage
      title="Web Series"
      description="Binge-worthy web series and original shows that keep you hooked"
      videos={videos}
      basePath="/web-series"
      availableGenres={["Crime", "Drama", "Thriller", "Action", "History"]}
    />
  );
}

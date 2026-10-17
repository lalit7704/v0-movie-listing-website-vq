import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByCategory } from "@/data/videos";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/hot-series", "Hot Series", "Browse hot web series and bold drama shows.");

export default function HotSeriesPage() {
  const videos = getVideosByCategory("Hot Series");

  return (
    <CollectionPage
      title="Hot Series"
      description="Bold and gripping web series and drama shows"
      videos={videos}
      basePath="/hot-series"
      availableGenres={["Drama", "Thriller", "Romance", "Crime"]}
    />
  );
}

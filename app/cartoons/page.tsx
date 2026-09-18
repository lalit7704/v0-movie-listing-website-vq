import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getCartoonVideos } from "@/data/videos";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/cartoons", "Cartoon Shows and Movies", "Browse animated movies and cartoon shows.");

export default function CartoonsPage() {
  const videos = getCartoonVideos();

  return (
    <CollectionPage
      title="Cartoon Shows & Movies"
      description="Your favorite animated content - from classic cartoons to modern anime"
      videos={videos}
      basePath="/cartoons"
      availableGenres={["Animation", "Comedy", "Action", "Adventure", "Family", "Sci-Fi", "Fantasy"]}
      availableLanguages={["English", "Hindi", "Japanese"]}
    />
  );
}

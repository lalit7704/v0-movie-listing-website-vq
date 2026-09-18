import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByGenre } from "@/data/videos";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/action", "Action Movies", "Browse action movies with thrilling stunts and adventure.");

export default function ActionPage() {
  const videos = getVideosByGenre("Action");

  return (
    <CollectionPage
      title="Action Movies"
      description="High-octane action, thrilling stunts, and explosive entertainment"
      videos={videos}
      basePath="/action"
    />
  );
}

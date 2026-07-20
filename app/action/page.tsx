import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByGenre } from "@/data/videos";

export const metadata: Metadata = {
  title: "Action Movies | Onemovie",
  description: "Browse action movie information, from stunt-driven blockbusters to crime and adventure titles.",
};

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

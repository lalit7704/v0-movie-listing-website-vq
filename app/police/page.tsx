import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByGenre } from "@/data/videos";

export const metadata: Metadata = {
  title: "Police Movies | Onemovie",
  description:
    "Watch the best crime & police investigation movies. Stream popular Hindi and Indian cinema full movies online.",
};

export default function PolicePage() {
  // NOTE: There is no dedicated "Police" genre in the existing dataset.
  // Using "Crime" genre as the closest match for a Police/Crime listing page.
  const videos = getVideosByGenre("Crime");

  return (
    <CollectionPage
      title="Police Movies"
      description="Crime investigation, police action, and justice-driven stories"
      videos={videos}
      basePath="/police"
    />
  );
}


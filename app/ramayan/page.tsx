import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByCategory } from "@/data/videos";

export const metadata: Metadata = {
  title: "Ramayan | Onemovie",
  description: "Watch epic tales from the Ramayan. Stream the best mythological movies and series.",
};

export default function RamayanPage() {
  const videos = getVideosByCategory("Ramayan");

  return (
    <CollectionPage
      title="Ramayan Special"
      description="Experience the divine epic of Lord Rama"
      videos={videos}
      basePath="/ramayan"
      availableLanguages={["Hindi"]}
    />
  );
}

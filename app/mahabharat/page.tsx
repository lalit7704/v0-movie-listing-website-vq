import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByGenre } from "@/data/videos";

export const metadata: Metadata = {
  title: "Mahabharat | Onemovie",
  description: "A mythological series based on Mahabharat, showing Lord Rama’s journey and victory of good over evil.",
};

export default function mahabharatPage() {
  const videos = getVideosByGenre("mahabharat");

  return (
    <CollectionPage
      title="Mahabharat"
      description="A mythological series based on Mahabharat, showing Lord Rama’s journey and victory of good over evil."
      videos={videos}
      basePath="/mahabharat"
      availableLanguages={["Hindi"]}
    />
  );
}

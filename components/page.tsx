import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByCategory } from "@/data/videos";

export const metadata: Metadata = {
  title: "Shree Krishna | Onemovie",
  description: "A mythological series based on Shree Krishna, showing the epic life and teachings of Lord Krishna.",
};

export default function shreeKrishnaPage() {
  const videos = getVideosByCategory("shree krishna");

  return (
    <CollectionPage
      title="Shree Krishna"
      description="A mythological series based on Shree Krishna, showing the epic life and teachings of Lord Krishna."
      videos={videos}
      basePath="/shree-krishna"
      availableLanguages={["Hindi"]}
    />
  );
}
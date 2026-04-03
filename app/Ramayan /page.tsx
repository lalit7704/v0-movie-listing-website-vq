import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByGenre } from "@/data/videos";

export const metadata: Metadata = {
  title: "Ramayan (All Episodes) | Onemovie",
  description: "Explore futuristic worlds with sci-fi movies, space adventures, and mind-bending stories.",
};

export default function SciFiPage() {
  const videos = getVideosByGenre("Ramayan (All Episodes)");

  return (
    <CollectionPage
      title="Ramayan (All Episodes)"
      description="Futuristic worlds, space adventures, and mind-bending stories"
      videos={videos}
      basePath="/sci-fi"
    />
  );
}

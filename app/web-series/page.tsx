import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByCategory } from "@/data/videos";

export const metadata: Metadata = {
  title: "Web Series | Onemovie",
  description: "Browse web-series information across crime, thriller, drama, action and other genres.",
  alternates: { canonical: "/web-series" },
};

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

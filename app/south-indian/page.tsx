import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByCategory } from "@/data/videos";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/south-indian", "South Indian Movies", "Browse Telugu, Tamil, Kannada, and Malayalam movies.");

export default function SouthIndianPage() {
  const videos = getVideosByCategory("South Indian");

  return (
    <CollectionPage
      title="South Indian Movies"
      description="Discover the best of Telugu, Tamil, Kannada, and Malayalam cinema"
      videos={videos}
      basePath="/south-indian"
      availableLanguages={["Telugu", "Tamil", "Kannada", "Malayalam"]}
    />
  );
}

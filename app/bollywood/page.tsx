import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByCategory } from "@/data/videos";
import { AmazonProductGrid } from "@/components/amazon-product-grid";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/bollywood", "Bollywood Movies", "Browse Bollywood movies, Hindi films, and Indian cinema.");

export default function BollywoodPage() {
  const videos = getVideosByCategory("Bollywood");
  

  return (
    <CollectionPage
      title="Bollywood Movies"
      description="Explore the best of Hindi cinema - from blockbuster hits to timeless classics"
      videos={videos}
      basePath="/bollywood"
      availableLanguages={["Hindi"]}
    >
    </CollectionPage>
  );
}

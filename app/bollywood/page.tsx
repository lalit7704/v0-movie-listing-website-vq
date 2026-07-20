import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByCategory } from "@/data/videos";
import { AmazonProductGrid } from "@/components/amazon-product-grid";

export const metadata: Metadata = {
  title: "Bollywood Movies | Onemovie",
  description: "Browse Bollywood and Hindi film information, including recent releases and classic titles.",
};

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

import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByCategory } from "@/data/videos";
import { AmazonAd } from "@/components/amazon-ad";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/hollywood", "Hollywood Movies", "Browse Hollywood movies, action films, sci-fi titles, and more.");

export default function HollywoodPage() {
  const videos = getVideosByCategory("Hollywood");

  return (
    <CollectionPage
      title="Hollywood Movies"
      description="Experience the best of Hollywood - blockbusters, classics, and everything in between"
      videos={videos}
      basePath="/hollywood"
      availableLanguages={["English"]}
    >
    
    </CollectionPage>
  );
}

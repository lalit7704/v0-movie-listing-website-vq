import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByCategory } from "@/data/videos";
import { AmazonAd } from "@/components/amazon-ad";

export const metadata: Metadata = {
  title: "Hollywood Movies | Onemovie",
  description: "Browse Hollywood movie information across action, drama, science fiction and other genres.",
};

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

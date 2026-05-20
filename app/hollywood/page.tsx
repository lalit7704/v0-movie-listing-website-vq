import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByCategory } from "@/data/videos";
import { AmazonAd } from "@/components/amazon-ad";

export const metadata: Metadata = {
  title: "Hollywood Movies | Onemovie",
  description: "Watch the latest Hollywood blockbusters, action movies, sci-fi thrillers, and more. Stream the best of American cinema.",
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
    <AmazonAd 
        title="Ambrane Aerosync 65 Powerbank – 4-in-1 MagSafe Wireless Powerbank with Inbuilt Type-C Cable, 65W Fast Charging, 15000mAh for iPhone, Android & Type-C Laptops (Green)"
        description="4-in-1 Powerbank with Inbuilt Charger: Experience the convenience of a power bank integrated with an AC charger. With a 65W output, the AeroSync 65 ensures your gadgets, including smartphones and laptops, are powered up quickly, making it the best power bank for fast charging needs."
        imageUrl="https://m.media-amazon.com/images/I/717ByupjUvL._SL1500_.jpg"
        productUrl="https://amzn.in/d/06zAAbxx"
        buttonText="Check Price on Amazon"
      />
    </CollectionPage>
  );
}

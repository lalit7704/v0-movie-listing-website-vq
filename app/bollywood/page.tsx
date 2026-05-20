import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByCategory } from "@/data/videos";
import { AmazonAd } from "@/components/amazon-ad";

export const metadata: Metadata = {
  title: "Bollywood Movies | Onemovie",
  description: "Watch the latest Bollywood movies, Hindi films, and Indian cinema. Stream blockbuster hits and classic favorites.",
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
      <AmazonAd 
        title="insta360 X3 Action Camera, 1/2 Sensor, 5.7K 360 Capture, Optical Zoom 3X, 72 MP 360 Photo, 4K Single Lens Mode, Black"
        description="अपनी खुद की एक्शन और सिनेमैटिक वीडियो शूट करें! Insta360 X3 एक्शन कैमरा के साथ 5.7K 360 वीडियो कैप्चर करें और हर पल को एक ब्लॉकबस्टर मूवी जैसा बनाएं।"
        imageUrl="https://m.media-amazon.com/images/I/610NQUzk2xL._SL1500_.jpg"
        productUrl="https://amzn.to/4dF3J0U"
        buttonText="Check Price on Amazon"
      />
    </CollectionPage>
  );
}

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
        title="Sony Bravia 4K Ultra HD Smart LED TV"
        description="घर पर ही सिनेमा का मज़ा लें! अपनी पसंदीदा बॉलीवुड ब्लॉकबस्टर फिल्मों को शानदार 4K HDR रिज़ॉल्यूशन और बेहतरीन साउंड क्वालिटी में देखें।"
        imageUrl="https://m.media-amazon.com/images/I/81wxS8abrgL._SX679_.jpg"
        productUrl="https://amzn.to/4dF3J0U"
        buttonText="Check Price on Amazon"
      />
    </CollectionPage>
  );
}

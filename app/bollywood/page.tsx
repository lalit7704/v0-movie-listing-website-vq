import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByCategory } from "@/data/videos";
import { AmazonProductGrid } from "@/components/amazon-product-grid";

export const metadata: Metadata = {
  title: "Bollywood Movies | Onemovie",
  description: "Watch the latest Bollywood movies, Hindi films, and Indian cinema. Stream blockbuster hits and classic favorites.",
};

export default function BollywoodPage() {
  const videos = getVideosByCategory("Bollywood");
  
  const recommendedProducts = [
    {
      id: "p1",
      title: "insta360 X3 Action Camera, 5.7K 360 Capture",
      imageUrl: "https://m.media-amazon.com/images/I/610NQUzk2xL._SL1500_.jpg",
      productUrl: "https://amzn.to/4dF3J0U",
      price: "₹34,990"
    },
    {
      id: "p2",
      title: "Sony Bravia 139 cm (55 inches) 4K Ultra HD Smart LED Google TV",
      imageUrl: "https://m.media-amazon.com/images/I/81wxS8abrgL._SX679_.jpg",
      productUrl: "https://amzn.in/d/0975SFmX", // Update with your affiliate link
      price: "₹57,990"
    },
    {
      id: "p3",
      title: "Zebronics ZEB-PIXAPLAY 18 Smart Projector",
      imageUrl: "https://m.media-amazon.com/images/I/61NlH2Hn8WL._SL1500_.jpg",
      productUrl: "https://amzn.in/d/08NHCEfL", // Update with your affiliate link
      price: "₹12,499"
    }
    // आप यहाँ और भी प्रोडक्ट्स कॉमा (,) लगाकर जोड़ सकते हैं
  ];

  return (
    <CollectionPage
      title="Bollywood Movies"
      description="Explore the best of Hindi cinema - from blockbuster hits to timeless classics"
      videos={videos}
      basePath="/bollywood"
      availableLanguages={["Hindi"]}
    >
      <AmazonProductGrid products={recommendedProducts} />
    </CollectionPage>
  );
}

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
  
{/* 300x250 Ad Banner */}
<div className="flex justify-center my-6">
  <div
    dangerouslySetInnerHTML={{
      __html: `
        <script>
          atOptions = {
            'key' : '6231dfc46d1c0ab675dd42b3bf8fb11c',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        </script>
        <script
          type="text/javascript"
          src="//www.profitabledisplaynetwork.com/xxxxx/invoke.js">
        </script>
      `,
    }}
  />
</div>
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

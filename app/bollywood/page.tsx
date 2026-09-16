import { Metadata } from "next";
import Script from "next/script";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByCategory } from "@/data/videos";
import { AmazonProductGrid } from "@/components/amazon-product-grid";

export const metadata: Metadata = {
  title: "Bollywood Movies | Onemovie",
  description:
    "Watch the latest Bollywood movies, Hindi films, and Indian cinema. Stream blockbuster hits and classic favorites.",
};

export default function BollywoodPage() {
  const videos = getVideosByCategory("Bollywood");

  return (
    <>
      {/* 300x250 Ad Banner */}
      <div className="flex justify-center my-6">
        <div
          id="ad-300x250"
          style={{
            width: "300px",
            height: "250px",
          }}
        >
          <Script
            id="ad-options-300x250"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                atOptions = {
                  'key' : '6231dfc46d1c0ab675dd42b3bf8fb11c',
                  'format' : 'iframe',
                  'height' : 250,
                  'width' : 300,
                  'params' : {}
                };
              `,
            }}
          />

          <Script
            id="ad-invoke-300x250"
            strategy="afterInteractive"
            src="//www.profitabledisplaynetwork.com/6231dfc46d1c0ab675dd42b3bf8fb11c/invoke.js"
          />
        </div>
      </div>

      <CollectionPage
        title="Bollywood Movies"
        description="Explore the best of Hindi cinema - from blockbuster hits to timeless classics"
        videos={videos}
        basePath="/bollywood"
        availableLanguages={["Hindi"]}
      />
    </>
  );
}
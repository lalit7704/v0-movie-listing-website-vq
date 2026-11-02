import { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { AdultAgeGate } from "@/components/adult-age-gate";
import { adultVideos } from "@/data/videos";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...createPageMetadata("/adult", "18+ Adult", "Adult videos for viewers aged 18 and over."),
  // Marks the page as adult for Google SafeSearch, so the rest of the site isn't filtered.
  other: { rating: "adult" },
};

export default function AdultPage() {
  return (
    <>
      <AdultAgeGate />
      <CollectionPage
        title="18+ Adult"
        description="For viewers aged 18 and over only"
        videos={adultVideos}
        basePath="/adult"
      />
    </>
  );
}

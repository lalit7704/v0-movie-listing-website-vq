import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { getVideosByCategory } from "@/data/videos";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/shree-krishna", "Shree Krishna Episodes", "Browse the Shree Krishna collection in Hindi.");

export default function ShreeKrishnaPage() {
  return (
    <CollectionPage
      title="Shree Krishna"
      description="Watch Shree Krishna episodes in Hindi in chronological order."
      videos={getVideosByCategory("Shree Krishna")}
      basePath="/shree-krishna"
      availableLanguages={["Hindi"]}
    />
  );
}

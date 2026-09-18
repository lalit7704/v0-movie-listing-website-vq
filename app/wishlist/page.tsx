import type { Metadata } from "next";
import { WishlistPageContent } from "@/components/wishlist-page-content";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata("/wishlist", "My Wishlist", "View the movies and web series saved to your Onemovie wishlist.", false);

export default function WishlistPage() {
  return <WishlistPageContent />;
}

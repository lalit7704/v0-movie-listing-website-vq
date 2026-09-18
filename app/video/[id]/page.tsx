import { notFound, permanentRedirect } from "next/navigation";
import { getVideoById, videos } from "@/data/videos";
import { generateSlug } from "@/lib/seo-utils";

interface VideoPageProps {
  params: Promise<{ id: string }>;
}

// Preserve legacy /video/[id] links while consolidating every detail page on
// the public, slug-based URL used by cards, metadata, and the sitemap.
export async function generateStaticParams() {
  return videos.map((video) => ({ id: video.id }));
}

export default async function LegacyVideoPage({ params }: VideoPageProps) {
  const { id } = await params;
  const video = getVideoById(id);

  if (!video) notFound();

  permanentRedirect(`/movie/${video.slug || generateSlug(video.title)}`);
}

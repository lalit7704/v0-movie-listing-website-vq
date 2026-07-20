import { notFound, redirect } from "next/navigation";
import { videos, getVideoById } from "@/data/videos";

interface VideoPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return videos.map((video) => ({ id: video.id }));
}

export default async function LegacyVideoPage({ params }: VideoPageProps) {
  const { id } = await params;
  const video = getVideoById(id);

  if (!video) notFound();
  redirect(`/movie/${video.slug}`);
}

import { NextResponse } from "next/server";
import { videos } from "@/data/videos";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const movie = videos.find(
    (v) => v.slug === params.slug
  );

  if (!movie) {
    return NextResponse.json({
      success: false,
    });
  }

  return NextResponse.json({
    success: true,
    movie,
  });
}
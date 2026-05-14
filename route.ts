import { NextRequest, NextResponse } from "next/server";
import { videos, getVideoBySlug, getVideoById } from "@/data/videos";
import { generateSlug } from "@/lib/seo-utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // 1. Ab telegram se ID (jaise 2001) aayegi, toh pehle ID se check karein
    let movie = getVideoById(slug);

    // 2. Agar ID se nahi milti toh slug se try karein
    if (!movie) {
      movie = getVideoBySlug(slug);
    }

    // 3. Fallback: search by generated slug from title
    if (!movie && videos) {
      movie = videos.find((v) => generateSlug(v.title) === slug);
    }

    if (!movie) {
      return NextResponse.json({ success: false, error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, movie });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
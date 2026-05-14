import { NextRequest, NextResponse } from "next/server";
import { videos, getVideoBySlug, getVideoById } from "@/data/videos";
import { generateSlug } from "@/lib/seo-utils";

export async function GET(
  request: NextRequest,
  { params }: any // 'any' rakha hai taaki [slug] ya [id] dono folder names pe kaam kare
) {
  try {
    const resolvedParams = await params;
    const queryParam = resolvedParams.slug || resolvedParams.id;

    if (!queryParam) {
      return NextResponse.json({ success: false, error: "Missing parameter" }, { status: 400 });
    }

    const cleanParam = queryParam.trim();

    // 1. Try finding by ID first
    let movie = getVideoById(cleanParam);

    // 2. Fallback to search by Slug
    if (!movie) {
      movie = getVideoBySlug(cleanParam);
    }

    if (!movie) {
      return NextResponse.json({ success: false, error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, movie });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
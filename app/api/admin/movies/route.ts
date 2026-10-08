import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { videos, type Video } from "@/data/videos";
import { getAdminSession } from "@/lib/admin-auth";
import { isGitHubConfigured, updateRepoFile } from "@/lib/github";
import {
  CATEGORY_SOURCES,
  MOVIE_CATEGORIES,
  getUsedValues,
  insertMovie,
  nextMovieId,
  normalizeDownloadUrl,
  slugify,
} from "@/lib/movie-source";

class MovieInputError extends Error {}

const list = z
  .string()
  .default("")
  .transform((value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  );

const movieSchema = z.object({
  category: z.enum(MOVIE_CATEGORIES),
  title: z.string().trim().min(2, "Title is required").max(200),
  slug: z.string().trim().max(200).default(""),
  id: z.string().trim().regex(/^[\w-]*$/, "ID can only have letters, numbers, - and _").default(""),
  videoUrl: z.string().trim().url("Video URL must be a full link"),
  downloadUrl: z.string().trim().default(""),
  poster: z.string().trim().url("Poster must be a full image link"),
  description: z.string().trim().min(10, "Description is too short"),
  seoDescription: z.string().trim().default(""),
  year: z.coerce.number().int().min(1900).max(2100),
  duration: z.string().trim().min(1, "Duration is required").max(30),
  rating: z.coerce.number().min(0).max(10),
  genre: list.refine((genres) => genres.length > 0, "Add at least one genre"),
  language: z.string().trim().min(1, "Language is required"),
  quality: z.string().trim().min(1, "Quality is required"),
  featured: z.boolean().default(false),
  director: z.string().trim().default(""),
  cast: list,
  keywords: list,
});

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!isGitHubConfigured()) {
    return NextResponse.json(
      { success: false, error: "GITHUB_TOKEN is not set on the server" },
      { status: 503 }
    );
  }

  const parsed = movieSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      { success: false, error: `${issue.path.join(".") || "form"}: ${issue.message}` },
      { status: 400 }
    );
  }

  const input = parsed.data;
  const slug = slugify(input.slug || input.title);
  if (!slug) {
    return NextResponse.json({ success: false, error: "slug: Could not build a slug" }, { status: 400 });
  }

  const { file, exportName } = CATEGORY_SOURCES[input.category];
  let movie: Video | null = null;

  try {
    const { commitUrl } = await updateRepoFile(file, `Add movie: ${input.title}`, (current) => {
      // The deployed bundle can lag behind the branch, so check the fresh file too.
      const takenIds = new Set([...videos.map((v) => v.id), ...getUsedValues(current, "id")]);
      const takenSlugs = new Set([...videos.map((v) => v.slug), ...getUsedValues(current, "slug")]);

      if (takenSlugs.has(slug)) throw new MovieInputError(`slug: "${slug}" is already used by another movie`);
      if (input.id && takenIds.has(input.id)) throw new MovieInputError(`id: ${input.id} is already used`);

      movie = {
        id: input.id || nextMovieId(current, takenIds),
        title: input.title,
        slug,
        videoUrl: input.videoUrl,
        downloadUrl: normalizeDownloadUrl(input.downloadUrl),
        poster: input.poster,
        description: input.description,
        seoDescription: input.seoDescription || undefined,
        category: input.category,
        year: input.year,
        duration: input.duration,
        rating: input.rating,
        genre: input.genre,
        language: input.language,
        quality: input.quality,
        featured: input.featured || undefined,
        director: input.director || undefined,
        cast: input.cast.length ? input.cast : undefined,
        keywords: input.keywords.length ? input.keywords : undefined,
      };
      return insertMovie(current, exportName, movie);
    });

    const added = movie as Video | null;
    return NextResponse.json({
      success: true,
      id: added?.id,
      slug,
      file,
      commitUrl,
      pagePath: `/movie/${slug}`,
    });
  } catch (error) {
    const isInputError = error instanceof MovieInputError;
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Could not add movie" },
      { status: isInputError ? 409 : 502 }
    );
  }
}

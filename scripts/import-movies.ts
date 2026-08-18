import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });

import { bollywoodVideos } from "../data/bollywood";
import { hollywoodVideos } from "../data/hollywood";
import { cartoonVideos } from "../data/cartoon";
import { southindianVideos } from "../data/south-indian";
import { webSeriesVideos } from "../data/web-series";

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing from .env.local"
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const allVideos = [
    ...bollywoodVideos,
    ...hollywoodVideos,
    ...cartoonVideos,
    ...southindianVideos,
    ...webSeriesVideos,
  ];

  console.log(`Source movies: ${allVideos.length}`);

  // Remove duplicate movies using slug
  const uniqueMovies = Array.from(
    new Map(
      allVideos
        .filter((movie) => movie?.slug)
        .map((movie) => [movie.slug, movie])
    ).values()
  );

  console.log(`Unique movies: ${uniqueMovies.length}`);

  const movies = uniqueMovies.map((movie) => ({
    id: String(movie.id),
    title: movie.title,
    slug: movie.slug,
    video_url: movie.videoUrl || null,
    poster: movie.poster || null,
    description: movie.description || null,
    seo_description: movie.seoDescription || null,
    category: movie.category || null,
    year: movie.year ?? null,
    duration: movie.duration || null,
    rating: movie.rating ?? 0,
    genre: Array.isArray(movie.genre) ? movie.genre : [],
    language: movie.language || null,
    quality: movie.quality || null,
    featured: movie.featured ?? false,
    director: movie.director || null,
    cast_members: Array.isArray(movie.cast) ? movie.cast : [],
    keywords: Array.isArray(movie.keywords) ? movie.keywords : [],
  }));

  const BATCH_SIZE = 500;

  for (let i = 0; i < movies.length; i += BATCH_SIZE) {
    const batch = movies.slice(i, i + BATCH_SIZE);

    console.log(
      `Importing ${i + 1}-${Math.min(
        i + BATCH_SIZE,
        movies.length
      )} of ${movies.length}`
    );

    const { error } = await supabase
      .from("movies")
      .upsert(batch, {
        onConflict: "slug",
      });

    if (error) {
      console.error("Import failed:");
      console.error(error);
      process.exit(1);
    }

    console.log("Batch imported successfully.");
  }

  console.log("");
  console.log("=================================");
  console.log("MOVIE IMPORT COMPLETED");
  console.log("=================================");
  console.log(`Source movies: ${allVideos.length}`);
  console.log(`Unique movies: ${uniqueMovies.length}`);
}

main().catch((error) => {
  console.error("Migration failed:");
  console.error(error);
  process.exit(1);
});
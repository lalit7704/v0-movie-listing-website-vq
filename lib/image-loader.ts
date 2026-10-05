"use client";

// Vercel image optimization is over its plan quota (it answers 402), so images load
// straight from their CDN, using the CDN's own URL format to pick the size.
const TMDB_WIDTHS = [185, 342, 500, 780];

export default function imageLoader({ src, width }: { src: string; width: number }) {
  // IMDb posters end in "._V1_<modifiers>.jpg"; UX<n> returns an n-pixel-wide copy.
  if (src.startsWith("https://m.media-amazon.com/images/M/")) {
    return src.replace(/\._V1_[^/]*\.jpg$/, `._V1_FMjpg_UX${width}_.jpg`);
  }

  // TMDB serves fixed widths only; w780 is the size stored in the data files.
  if (src.startsWith("https://image.tmdb.org/t/p/")) {
    const size = TMDB_WIDTHS.find((tmdbWidth) => tmdbWidth >= width) ?? 780;
    return src.replace(/\/t\/p\/[^/]+\//, `/t/p/w${size}/`);
  }

  // Static files ignore the query string; it tells Next.js the width is handled.
  if (src.startsWith("/")) return `${src}?w=${width}`;

  return src;
}

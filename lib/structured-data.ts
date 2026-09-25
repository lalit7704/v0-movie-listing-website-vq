import type { Video } from "@/data/videos";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

function toIsoDuration(duration: string) {
  const match = duration.match(/(?:(\d+)\s*h(?:ours?)?)?\s*(?:(\d+)\s*m(?:in(?:utes?)?)?)?/i);

  if (!match || (!match[1] && !match[2])) return undefined;

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  return `PT${hours ? `${hours}H` : ""}${minutes ? `${minutes}M` : ""}`;
}

function people(names: string) {
  return names
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => ({ "@type": "Person", name }));
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/icons/icon-512.png"),
  };
}

/** Prevent text from closing a JSON-LD script tag when movie data contains HTML. */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateMoviePageJsonLd(video: Video, categoryPath: string) {
  const movieUrl = absoluteUrl(`/movie/${video.slug}`);
  const movie: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "@id": `${movieUrl}#movie`,
    name: video.title,
    description: video.description,
    url: movieUrl,
    image: video.poster,
    datePublished: `${video.year}-01-01`,
    genre: video.genre,
    inLanguage: video.language,
  };

  const duration = toIsoDuration(video.duration);
  if (duration) movie.duration = duration;

  const directors = video.director ? people(video.director) : [];
  if (directors.length) movie.director = directors.length === 1 ? directors[0] : directors;
  if (video.cast?.length) movie.actor = video.cast.map((name) => ({ "@type": "Person", name }));

  return [
    movie,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: video.category, item: absoluteUrl(categoryPath) },
        { "@type": "ListItem", position: 3, name: video.title, item: movieUrl },
      ],
    },
  ];
}

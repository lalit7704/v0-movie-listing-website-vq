import type { Video } from "@/data/videos";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

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

export function generateMoviePageJsonLd(video: Video, categoryPath: string) {
  const movie: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: video.title,
    description: video.description,
    url: absoluteUrl(`/movie/${video.slug}`),
    image: video.poster,
    datePublished: `${video.year}-01-01`,
    genre: video.genre,
    inLanguage: video.language,
  };

  if (video.director) movie.director = { "@type": "Person", name: video.director };
  if (video.cast?.length) movie.actor = video.cast.map((name) => ({ "@type": "Person", name }));

  return [
    movie,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: video.category, item: absoluteUrl(categoryPath) },
        { "@type": "ListItem", position: 3, name: video.title, item: absoluteUrl(`/movie/${video.slug}`) },
      ],
    },
  ];
}

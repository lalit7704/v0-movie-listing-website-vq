export interface Video {
  id: string;
  title: string;
  slug: string;
  videoUrl: string;
  downloadUrl: string;
  poster: string;
  description: string;
  seoDescription?: string;
  category: string;
  year: number;
  duration: string;
  rating: number;
  genre: string[];
  language: string;
  quality: string;
  featured?: boolean;
  director?: string;
  cast?: string[];
  keywords?: string[];
}

/* ---------------- SLUG HELPER ---------------- */

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ---------------- CARTOON DATA ---------------- */

export const cartoonVideos: Video[] = [
  {
    id: "9001",
    title: "The Super Mario Galaxy Movie (2026)",
    slug: generateSlug("The Super Mario Galaxy Movie 2026"),
    videoUrl: "https://youtu.be/bjqEWgDVPe0",
    downloadUrl: "https://t.me/onemoviedownloa/101",
    poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/u3M1bK0wW1LDEiM62mX1yT54p2Q.jpg",
    description: "In the film, Mario and Luigi and their friends adventure into outer space, where they face off against Bowser and his son Bowser Jr. to save Princess Rosalina, the adoptive mother of the Lumas. Princess Peach discovers she has the same powers as Rosalina, her long-lost older sister, and they were both born from stardust.",
    seoDescription: "Watch The Super Mario Galaxy Movie (2026) online. Mario, Luigi, and Princess Peach embark on an adventure across the galaxy to save Rosalina from Bowser Jr. A sequel to the 2023 hit, filled with action, comedy, and family fun.",
    category: "Cartoon",
    year: 2026,
    duration: "1h 38m",
    rating: 8.8,
    genre: ["Animation", "Kids & Family", "Action", "Adventure", "Comedy"],
    language: "Hindi",
    quality: "HD",
    featured: true,
    director: "Aaron Horvath, Michael Jelenic",
    cast: ["Chris Pratt", "Anya Taylor-Joy", "Charlie Day", "Jack Black", "Brie Larson"],
    keywords: ["mario", "super mario", "galaxy", "nintendo", "illumination", "animated movie", "cartoon"]
  }
];
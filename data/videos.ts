import { bollywoodVideos } from "./bollywood";
import { hollywoodVideos } from "./hollywood";

/* ---------------- INTERFACE ---------------- */

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

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ---------------- MAIN VIDEO COLLECTION ---------------- */

export const videos: Video[] = [
  ...bollywoodVideos,
  ...hollywoodVideos,
];

/* ---------------- HELPERS ---------------- */

export const getVideosByCategory = (category: string): Video[] => {
  return videos.filter(
    (video) => video.category.toLowerCase() === category.toLowerCase()
  );
};

export const getFeaturedVideos = (): Video[] => {
  return videos.filter((video) => video.featured === true);
};

export const getLatestVideos = (): Video[] => {
  return [...videos].sort((a, b) => b.year - a.year).slice(0, 10);
};

export const getTrendingVideos = (): Video[] => {
  return [...videos].sort((a, b) => b.rating - a.rating).slice(0, 10);
};

export const getPopularVideos = (): Video[] => {
  return videos.filter((video) => video.rating >= 7.5).slice(0, 10);
};

export const getTopRatedVideos = (): Video[] => {
  return [...videos].sort((a, b) => b.rating - a.rating).slice(0, 10);
};

export const getVideosByGenre = (genre: string): Video[] => {
  return videos.filter((video) => video.genre.includes(genre));
};

export const getVideoById = (id: string): Video | undefined => {
  return videos.find((video) => video.id === id);
};

export const getVideoBySlug = (slug: string): Video | undefined => {
  return videos.find((video) => video.slug === slug);
};

export const getAllVideoSlugs = (): string[] => {
  return videos.map((video) => video.slug);
};

export const getRecommendedVideos = (currentVideoId: string): Video[] => {
  const current = getVideoById(currentVideoId);
  if (!current) return videos.slice(0, 10);

  return videos
    .filter((video) => video.id !== currentVideoId)
    .filter(
      (video) =>
        video.category === current.category ||
        video.genre.some((g) => current.genre.includes(g))
    )
    .slice(0, 10);
};

export const getUpcomingVideos = (): Video[] => {
  return videos.filter((video) => video.year >= 2025).slice(0, 10);
};

export const getHindiDubbedVideos = (): Video[] => {
  return videos
    .filter(
      (video) =>
        video.language.toLowerCase() !== "hindi" &&
        (video.category.toLowerCase() === "hollywood" ||
          video.category.toLowerCase() === "south indian")
    )
    .slice(0, 10);
};
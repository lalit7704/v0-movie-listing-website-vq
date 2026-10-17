import { bollywoodVideos } from "./bollywood";
import { hollywoodVideos } from "./hollywood";
import { webSeriesVideos } from "./web-series";
import { cartoonVideos } from "./cartoon";
import { ramayanaVideos } from "./ramayana";
import { southindianVideos } from "./south-indian";
import { mahabharatVideos } from "./mahabharat";
import { shreekrishnaVideos } from "./shree-krishna";

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
  /** ISO date the entry was added to the site; drives "Latest Added". */
  addedAt?: string;
}

/* ---------------- NORMALIZE ---------------- */

// "South Indian" and "south-indian" are both used in the data files.
const normalize = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[\s-]+/g, "");

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

/* ---------------- MAIN DATA ---------------- */

const allVideos: Video[] = [
  ...bollywoodVideos,
  ...hollywoodVideos,
  ...webSeriesVideos,
  ...cartoonVideos,
  ...ramayanaVideos,
  ...southindianVideos,
  ...mahabharatVideos,
  ...shreekrishnaVideos,
];

// TMDB auto-imports are placeholders: when a hand-written entry uses the same
// slug, keep the hand-written one so the film isn't listed twice.
const handWrittenSlugs = new Set(
  allVideos.filter((v) => !v.id.startsWith("tmdb-")).map((v) => v.slug)
);

export const videos: Video[] = allVideos.filter(
  (v) => !v.id.startsWith("tmdb-") || !handWrittenSlugs.has(v.slug)
);

/* ---------------- HELPERS ---------------- */

export const getVideosByCategory = (category: string): Video[] => {
  return videos.filter(
    (v) => normalize(v.category) === normalize(category)
  );
};

export const getFeaturedVideos = (): Video[] => {
  return videos.filter((v) => v.featured === true);
};

export const getLatestVideos = (): Video[] => {
  return [...videos].sort((a, b) => b.year - a.year).slice(0, 10);
};

const ADDABLE_CATEGORIES = new Set(["bollywood", "hollywood", "southindian", "webseries", "cartoon"]);

// Every existing entry in these categories carries addedAt, so one without it was
// hand-written after the backfill and counts as the newest. Series episodes
// (Ramayan, Mahabharat, Shree Krishna) never compete for "latest".
function addedTime(video: Video) {
  if (video.addedAt) return Date.parse(video.addedAt) || 0;
  return ADDABLE_CATEGORIES.has(normalize(video.category)) ? Infinity : 0;
}

/** Most recently added first, optionally within one category; ties keep file order, where later entries are newer. */
export const getRecentlyAddedVideos = (limit: number, category?: string): Video[] => {
  return videos
    .map((video, index) => ({ video, index }))
    .filter(
      ({ video }) =>
        video.poster &&
        addedTime(video) > 0 &&
        (!category || normalize(video.category) === normalize(category))
    )
    .sort((a, b) => addedTime(b.video) - addedTime(a.video) || b.index - a.index)
    .slice(0, limit)
    .map(({ video }) => video);
};

export const getTrendingVideos = (): Video[] => {
  return [...videos].sort((a, b) => b.rating - a.rating).slice(0, 10);
};

export const getPopularVideos = (): Video[] => {
  return videos.filter((v) => v.rating >= 7.5).slice(0, 10);
};

export const getTopRatedVideos = (): Video[] => {
  return [...videos].sort((a, b) => b.rating - a.rating).slice(0, 10);
};

export const getVideosByGenre = (genre: string): Video[] => {
  return videos.filter((v) => v.genre.includes(genre));
};

export const getVideoById = (id: string): Video | undefined => {
  return videos.find((v) => v.id === id);
};

export const getVideoBySlug = (slug: string): Video | undefined => {
  return videos.find((v) => v.slug === slug);
};

export const getAllVideoSlugs = (): string[] => {
  return videos.map((v) => v.slug);
};

export const getRecommendedVideos = (currentVideoId: string): Video[] => {
  const current = getVideoById(currentVideoId);
  if (!current) return videos.slice(0, 10);

  return videos
    .filter((v) => v.id !== currentVideoId)
    .filter(
      (v) =>
        v.category === current.category ||
        v.genre.some((g) => current.genre.includes(g))
    )
    .slice(0, 10);
};

export const getUpcomingVideos = (): Video[] => {
  return videos.filter((v) => v.year >= 2025).slice(0, 10);
};

export const getHindiDubbedVideos = (): Video[] => {
  return videos
    .filter(
      (v) => normalize(v.language) === "hindi" &&
        (normalize(v.category) === "hollywood" ||
          normalize(v.category) === "southindian")
    )
    .slice(0, 10);
};

/* ---------------- CARTOON HELPERS (FIXED ERROR) ---------------- */

export const getCartoonVideos = (): Video[] => {
  return videos.filter((v) => normalize(v.category) === "cartoon");
};

export const getAnimeVideos = (): Video[] => {
  return videos.filter(
    (v) =>
      v.genre.includes("Animation") ||
      v.title.toLowerCase().includes("anime")
  );
};

export const getKidsCartoons = (): Video[] => {
  return videos.filter(
    (v) =>
      v.genre.includes("Family") ||
      normalize(v.category) === "cartoon"
  );
};

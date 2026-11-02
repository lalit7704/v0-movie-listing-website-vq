import type { Video } from "./videos";

/* ---------------- 18+ ADULT DATA ---------------- */

// These videos appear only on /adult and on their own /movie/<slug> pages, both behind
// an "I am 18 or older" check. They are kept out of the homepage, search, genre pages,
// "You May Also Like" on other movies, and the sitemap.
//
// Add a video from /admin (category "Adult"), or paste an entry like this inside the
// array below. "category" must be "Adult"; "id" and "slug" must not be used elsewhere.
//
// {
//   "id": "18001",
//   "addedAt": "2026-11-03T12:00:00.000Z",
//   "title": "Video Title (2026)",
//   "slug": "video-title-2026",
//   "videoUrl": "https://youtu.be/xxxxxxxxxxx",
//   "downloadUrl": "https://t.me/onemoviedownloadd/123",
//   "poster": "https://example.com/poster.jpg",
//   "description": "A few lines about the video.",
//   "category": "Adult",
//   "year": 2026,
//   "duration": "1h 30m",
//   "rating": 0,
//   "genre": ["Drama"],
//   "language": "Hindi",
//   "quality": "HD"
// },

export const adultVideos: Video[] = [
];

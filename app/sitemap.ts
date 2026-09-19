import type { MetadataRoute } from "next";
import { videos } from "@/data/videos";
import { generateSlug } from "@/lib/seo-utils";
import { SITE_URL } from "@/lib/site";

const baseUrl = SITE_URL.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },

    // Main categories
    {
      url: `${baseUrl}/bollywood`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hollywood`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/south-indian`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/web-series`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // Genre pages
    {
      url: `${baseUrl}/comedy`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/drama`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cartoons`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/thriller`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sci-fi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/action`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ramayan`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mahabharat`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shree-krishna`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // Important pages
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/dmca`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Movie pages
  const seenSlugs = new Set<string>();

  const moviePages: MetadataRoute.Sitemap = videos.flatMap((video) => {
    if (!video?.title?.trim()) {
      return [];
    }

    // Existing slug use karo, warna title se slug generate karo
    const slug =
      video.slug?.trim() ||
      generateSlug(video.title);

    if (!slug) {
      return [];
    }

    // Duplicate URLs ko remove karo
    if (seenSlugs.has(slug)) {
      return [];
    }

    seenSlugs.add(slug);

    return [
      {
        url: `${baseUrl}/movie/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.9,
      },
    ];
  });

  return [...pages, ...moviePages];
}
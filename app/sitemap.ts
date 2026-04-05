import { MetadataRoute } from 'next';
import { videos } from '@/data/videos';
import { generateSlug } from '@/lib/seo-utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://onemovie.app';

  // Homepage
  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Category pages
    {
      url: `${baseUrl}/bollywood`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hollywood`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/south-indian`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/web-series`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/comedy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/drama`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cartoon`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/thriller`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sci-fi`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/action`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Movie/Video pages
  const moviePages = videos.map((video) => ({
    url: `${baseUrl}/movie/${generateSlug(video.title)}`,
    lastModified: new Date(video.year, 0, 1), // Use year as lastModified
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...pages, ...moviePages];
}

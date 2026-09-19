import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Keep non-HTML endpoints out of crawling. HTML pages that emit a
        // noindex tag must remain crawlable so search engines can see it.
        disallow: ['/api/', '/private/'],
      },
    ],
    sitemap: 'https://onemovie.in/sitemap.xml',
    host: 'https://onemovie.in',
  };
}

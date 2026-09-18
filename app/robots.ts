import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/private/', '/account', '/login', '/wishlist', '/upload', '/search'],
      },
    ],
    sitemap: 'https://onemovie.in/sitemap.xml',
    host: 'https://onemovie.in',
  };
}

/**
 * SEO Utilities for generating SEO-friendly URLs, metadata, and other optimization helpers
 */

/**
 * Converts a title to a SEO-friendly slug
 * @param title - The video title
 * @returns SEO-friendly slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove hyphens from start/end
}

/**
 * Generates a canonical URL for a page
 * @param slug - The page slug
 * @param baseUrl - The base URL of the site
 * @returns The canonical URL
 */
export function generateCanonicalUrl(slug: string, baseUrl: string = 'https://onemovie.in'): string {
  return `${baseUrl}/movie/${slug}`;
}

/**
 * Generates an optimized meta description
 * @param description - Original description
 * @param maxLength - Maximum length (default 160 characters)
 * @returns Optimized meta description
 */
export function generateMetaDescription(description: string, maxLength: number = 160): string {
  const trimmed = description.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return trimmed.substring(0, maxLength - 3) + '...';
}

/**
 * Generates SEO-optimized title
 * @param title - Video title
 * @param category - Video category
 * @param maxLength - Maximum length (default 60 characters)
 * @returns SEO-optimized title
 */
export function generateSEOTitle(title: string, _category: string, maxLength: number = 60): string {
  const baseTitle = `${title} | Onemovie`;
  if (baseTitle.length <= maxLength) return baseTitle;
  return `${title.substring(0, maxLength - 20)} - Onemovie`;
}

import type { Metadata } from "next";

export const SITE_NAME = "Onemovie";
export const SITE_URL = "https://onemovie.in";

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, SITE_URL).toString();
}

export function createPageMetadata(pathname: string, title: string, description: string, index = true): Metadata {
  const url = absoluteUrl(pathname);
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: pathname },
    robots: { index, follow: true },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, url, siteName: SITE_NAME, type: "website" },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description },
  };
}

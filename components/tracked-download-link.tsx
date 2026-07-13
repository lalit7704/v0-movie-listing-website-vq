"use client";

import type { ReactNode } from "react";
import { track } from "@vercel/analytics";

interface TrackedDownloadLinkProps {
  children: ReactNode;
  href: string;
  movieId: string;
  source: string;
}

export function TrackedDownloadLink({
  children,
  href,
  movieId,
  source,
}: TrackedDownloadLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("Movie Download Click", { movieId, source })}
    >
      {children}
    </a>
  );
}

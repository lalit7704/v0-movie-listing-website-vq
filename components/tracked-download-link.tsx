"use client";

import type { ReactNode } from "react";
import { track } from "@vercel/analytics";
import { useAuth } from "@/components/auth-provider";

const DOWNLOAD_REDIRECT_STORAGE_PREFIX = "om_download_redirect_";

interface TrackedDownloadLinkProps {
  children: ReactNode;
  href: string;
  movieId: string;
  source: string;
  firstClickRedirectUrl?: string;
}

export function TrackedDownloadLink({
  children,
  href,
  movieId,
  source,
  firstClickRedirectUrl,
}: TrackedDownloadLinkProps) {
  const { recordActivity } = useAuth();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        if (firstClickRedirectUrl) {
          try {
            const storageKey = `${DOWNLOAD_REDIRECT_STORAGE_PREFIX}${movieId}`;

            if (window.sessionStorage.getItem(storageKey) !== "true") {
              event.preventDefault();
              window.sessionStorage.setItem(storageKey, "true");
              window.open(firstClickRedirectUrl, "_blank", "noopener,noreferrer");
              return;
            }
          } catch {
            // Keep the Telegram download usable if browser storage is unavailable.
          }
        }

        track("Movie Download Click", { movieId, source });
        recordActivity("download_click", movieId, { source });
      }}
    >
      {children}
    </a>
  );
}

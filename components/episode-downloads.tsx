import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedDownloadLink } from "@/components/tracked-download-link";
import type { Episode } from "@/data/videos";
import {
  getSeriesDownloadUrl,
  getTelegramMessageId,
  resolveDownloadUrl,
} from "@/lib/download-url";

interface EpisodeDownloadsProps {
  videoId: string;
  episodes: Episode[];
  firstClickRedirectUrl?: string;
}

/** Web series episode list: one download per episode, plus the whole season through the bot. */
export function EpisodeDownloads({
  videoId,
  episodes,
  firstClickRedirectUrl,
}: EpisodeDownloadsProps) {
  const hasDownloads = episodes.some((episode) =>
    getTelegramMessageId(episode.downloadUrl)
  );

  return (
    <section
      id="episodes"
      className="bg-card rounded-xl p-6 border border-border"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Episodes ({episodes.length})
          </h2>
          {hasDownloads && (
            <p className="text-sm text-muted-foreground">
              Download one episode, or get the full season in one go.
            </p>
          )}
        </div>

        {hasDownloads && (
          <TrackedDownloadLink
            href={getSeriesDownloadUrl(videoId)}
            movieId={videoId}
            source="download-all"
            firstClickRedirectUrl={firstClickRedirectUrl}
          >
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Download All
            </Button>
          </TrackedDownloadLink>
        )}
      </div>

      <ol className="grid gap-2 sm:grid-cols-2">
        {episodes.map((episode, index) => {
          const number = index + 1;
          const isAvailable = Boolean(
            getTelegramMessageId(episode.downloadUrl)
          );

          return (
            <li
              key={number}
              className="flex items-center gap-3 rounded-lg border border-border bg-secondary/40 p-3"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary/15 text-sm font-semibold text-primary">
                E{String(number).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  Episode {number}
                </p>
                {episode.title && (
                  <p className="truncate text-xs text-muted-foreground">
                    {episode.title}
                  </p>
                )}
              </div>

              {isAvailable ? (
                <TrackedDownloadLink
                  href={resolveDownloadUrl(episode.downloadUrl)}
                  movieId={videoId}
                  source={`episode-${number}`}
                  firstClickRedirectUrl={firstClickRedirectUrl}
                >
                  <Button size="sm" variant="secondary" className="gap-1.5">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </TrackedDownloadLink>
              ) : (
                <Button size="sm" variant="secondary" disabled>
                  Soon
                </Button>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

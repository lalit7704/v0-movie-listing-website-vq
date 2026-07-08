import Link from "next/link";
import { Info, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Video } from "@/data/videos";

interface HeroSliderProps {
  videos: Video[];
}

export function HeroSlider({ videos }: HeroSliderProps) {
  const activeVideo = videos[0];

  if (!activeVideo) return null;

  const encodedPoster = encodeURIComponent(activeVideo.poster);
  const backgroundImage = [
    `linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.8) 45%, transparent 100%)`,
    `linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.4) 45%, transparent 100%)`,
    `image-set(url("/_next/image?url=${encodedPoster}&w=828&q=65") 1x, url("/_next/image?url=${encodedPoster}&w=1536&q=65") 2x)`,
  ].join(", ");

  return (
    <section className="relative h-[58vh] min-h-[460px] md:h-[82vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        aria-hidden="true"
        style={{ backgroundImage }}
      />

      <div className="relative h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-sm font-semibold bg-primary text-primary-foreground rounded">
              {activeVideo.quality}
            </span>
            <div className="flex items-center gap-1 px-3 py-1 bg-secondary rounded">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-foreground">
                {activeVideo.rating}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {activeVideo.year}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            {activeVideo.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{activeVideo.duration}</span>
            <span>&bull;</span>
            <span>{activeVideo.language}</span>
            <span>&bull;</span>
            <span>{activeVideo.genre.join(", ")}</span>
          </div>

          <p className="text-base md:text-lg text-muted-foreground line-clamp-3 max-w-xl text-pretty">
            {activeVideo.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href={`/video/${activeVideo.id}`}>
              <Button size="lg" className="gap-2 text-base">
                <Play className="w-5 h-5" fill="currentColor" />
                Watch Now
              </Button>
            </Link>
            <Link href={`/video/${activeVideo.id}`}>
              <Button size="lg" variant="outline" className="gap-2 text-base">
                <Info className="w-5 h-5" />
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

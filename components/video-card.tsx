"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Video } from "@/data/videos";
import { generateSlug } from "@/lib/seo-utils";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const slug = video.slug || generateSlug(video.title);
  const videoUrl = `/movie/${slug}`;

  return (
    <div className="group relative flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px]">
      <Link href={videoUrl}>
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted">
          <Image
            src={video.poster}
            alt={`${video.title} - ${video.category} movie streaming online`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 200px"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quality Badge */}
          <div className="absolute top-2 left-2">
            <span className="px-2 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded">
              {video.quality}
            </span>
          </div>
          
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-black/70 rounded text-xs">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-foreground font-medium">{video.rating}</span>
          </div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <Clock className="w-3 h-3" />
              <span>{video.duration}</span>
              <span>•</span>
              <span>{video.year}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Title */}
      <div className="mt-2 space-y-1">
        <h3 className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {video.genre.slice(0, 2).join(" • ")}
        </p>
      </div>

      {/* Watch Now Button - visible on hover */}
      <div className="absolute -bottom-2 left-0 right-0 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
        <Link href={videoUrl} className="block">
          <Button size="sm" className="w-full text-xs h-8" aria-label={`Watch ${video.title}`}>
            <Play className="w-3 h-3 mr-1" />
            Watch Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

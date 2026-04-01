"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Info, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Video } from "@/data/videos";

interface HeroSliderProps {
  videos: Video[];
}

export function HeroSlider({ videos }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentVideo = videos[currentIndex];

  if (!currentVideo) return null;

  return (
    <div
      className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentVideo.poster}
          alt={currentVideo.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl space-y-4 md:space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
          {/* Quality & Rating Badges */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-sm font-semibold bg-primary text-primary-foreground rounded">
              {currentVideo.quality}
            </span>
            <div className="flex items-center gap-1 px-3 py-1 bg-secondary rounded">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-foreground">
                {currentVideo.rating}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {currentVideo.year}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
            {currentVideo.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{currentVideo.duration}</span>
            <span>•</span>
            <span>{currentVideo.language}</span>
            <span>•</span>
            <span>{currentVideo.genre.join(", ")}</span>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground line-clamp-3 max-w-xl text-pretty">
            {currentVideo.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href={`/video/${currentVideo.id}`}>
              <Button size="lg" className="gap-2 text-base">
                <Play className="w-5 h-5" fill="currentColor" />
                Watch Now
              </Button>
            </Link>
            <Link href={`/video/${currentVideo.id}`}>
              <Button size="lg" variant="outline" className="gap-2 text-base">
                <Info className="w-5 h-5" />
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:block">
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-background/30 hover:bg-background/50 backdrop-blur-sm"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block">
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-background/30 hover:bg-background/50 backdrop-blur-sm"
          onClick={nextSlide}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-primary"
                : "w-1.5 bg-muted-foreground/50 hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

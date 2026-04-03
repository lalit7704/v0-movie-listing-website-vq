"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface VideoPlayerProps {
  videoUrl: string;
  poster: string;
  title: string;
}
const isYouTube = (url: string) =>
  url.includes("youtube.com") || url.includes("youtu.be");

const getYouTubeEmbedUrl = (url: string) => {
  try {
    if (url.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${url.split("/").pop()?.split("?")[0]}`;
    }

    if (url.includes("watch?v=")) {
      return `https://www.youtube.com/embed/${url.split("v=")[1].split("&")[0]}`;
    }

    return url;
  } catch {
    return url;
  }
};
export function VideoPlayer({ videoUrl, poster, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setHasStarted(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0];
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      {isYouTube(videoUrl) ? (
        <iframe
          src={
            videoUrl.includes("youtu.be")
              ? `https://www.youtube.com/embed/${videoUrl.split("/").pop()?.split("?")[0]}`
              : `https://www.youtube.com/embed/${videoUrl.split("v=")[1]?.split("&")[0]}`
          }
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={poster}
          className="w-full h-full object-contain"
          controls
        />
      )}


      {/* Play Button Overlay (before playing) */}
      {!hasStarted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Image
            src={poster}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
          <button
            onClick={togglePlay}
            className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
          >
            <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
          </button>
        </div>
      )}

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 transition-opacity duration-300 ${showControls && hasStarted ? "opacity-100" : "opacity-0"
          }`}
      >
        {/* Top Bar - Title */}
        <div className="absolute top-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
        </div>

        {/* Center Controls */}
        <div className="absolute inset-0 flex items-center justify-center gap-8">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 text-white hover:bg-white/20"
            onClick={() => skip(-10)}
          >
            <SkipBack className="w-6 h-6" />
          </Button>
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-primary-foreground" fill="currentColor" />
            ) : (
              <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
            )}
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 text-white hover:bg-white/20"
            onClick={() => skip(10)}
          >
            <SkipForward className="w-6 h-6" />
          </Button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          {/* Progress Bar */}
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="w-full"
          />

          {/* Controls Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Play/Pause */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-white hover:bg-white/20"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>

              {/* Volume */}
              <div className="flex items-center gap-2 group/volume">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-white hover:bg-white/20"
                  onClick={toggleMute}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
                <div className="w-0 group-hover/volume:w-20 overflow-hidden transition-all duration-300">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    className="w-20"
                  />
                </div>
              </div>

              {/* Time */}
              <span className="text-sm text-white/80">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-white hover:bg-white/20"
              onClick={toggleFullscreen}
            >
              <Maximize className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

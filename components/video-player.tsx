"use client";

import { useRef, useState } from "react";

interface Props {
  videoUrl: string;
}

export default function SmartPlayer({ videoUrl }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ Detect YouTube
  const isYouTube =
    videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

  // ✅ Convert to embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes("youtu.be")) {
      const id = url.split("/").pop();
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes("watch?v=")) {
      const id = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    return url; // already embed
  };

  // ▶️ Play / Pause (only for mp4)
  const togglePlay = () => {
    if (!isYouTube && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">

      {/* ✅ YouTube */}
      {isYouTube ? (
        <iframe
          src={getYouTubeEmbedUrl(videoUrl)}
          className="w-full h-full"
          allowFullScreen
        />
      ) : (
        /* ✅ MP4 */
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          className="w-full h-full"
        />
      )}
    </div>
  );
}
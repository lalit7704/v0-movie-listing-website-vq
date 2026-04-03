"use client";

interface Props {
  videoUrl: string;
}

export default function SmartPlayer({ videoUrl }: Props) {
  const isYouTube =
    videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${url.split("/").pop()}`;
    }
    if (url.includes("watch?v=")) {
      return `https://www.youtube.com/embed/${url.split("v=")[1]}`;
    }
    return url;
  };

  return (
    <div className="w-full aspect-video bg-black">
      {isYouTube ? (
        <iframe
          src={getEmbedUrl(videoUrl)}
          className="w-full h-full"
          allowFullScreen
        />
      ) : (
        <video src={videoUrl} controls className="w-full h-full" />
      )}
    </div>
  );
}
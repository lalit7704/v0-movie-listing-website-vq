"use client";

import { useState } from "react";
import Image from "next/image";
import type { ComponentProps } from "react";

type PosterImageProps = Omit<ComponentProps<typeof Image>, "src" | "alt" | "onError"> & {
  src: string;
  alt: string;
};

/** Keeps the card and detail layouts intact when an external poster is unavailable. */
export function PosterImage({ src, alt, ...props }: PosterImageProps) {
  const [imageSrc, setImageSrc] = useState(src.trim() || "/placeholder.jpg");

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={() => setImageSrc("/placeholder.jpg")}
    />
  );
}

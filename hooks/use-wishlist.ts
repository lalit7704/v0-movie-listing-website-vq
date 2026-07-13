"use client";

import { useCallback, useEffect, useState } from "react";

const WISHLIST_KEY = "onemovie:wishlist";
const WISHLIST_EVENT = "onemovie:wishlist-change";

function readWishlist(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const storedValue = JSON.parse(window.localStorage.getItem(WISHLIST_KEY) || "[]");
    return Array.isArray(storedValue)
      ? [...new Set(storedValue.filter((id): id is string => typeof id === "string"))]
      : [];
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const syncWishlist = useCallback(() => {
    setWishlistIds(readWishlist());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    syncWishlist();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === WISHLIST_KEY) syncWishlist();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(WISHLIST_EVENT, syncWishlist);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(WISHLIST_EVENT, syncWishlist);
    };
  }, [syncWishlist]);

  const toggleWishlist = useCallback((videoId: string) => {
    const currentIds = readWishlist();
    const nextIds = currentIds.includes(videoId)
      ? currentIds.filter((id) => id !== videoId)
      : [...currentIds, videoId];

    try {
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(nextIds));
      window.dispatchEvent(new Event(WISHLIST_EVENT));
    } catch {
      // Storage may be blocked by strict browser privacy settings.
    }
  }, []);

  const isWishlisted = useCallback(
    (videoId: string) => wishlistIds.includes(videoId),
    [wishlistIds]
  );

  return { wishlistIds, isLoaded, isWishlisted, toggleWishlist };
}

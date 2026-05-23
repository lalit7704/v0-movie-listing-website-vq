"use client";
import { useEffect, useState } from "react";
import { DiscussionEmbed } from "disqus-react";

interface MovieCommentsProps {
  slug: string;
  title: string;
}

export function MovieComments({ slug, title }: MovieCommentsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const disqusShortname = "onemovie-2";

  const disqusConfig = {
    url: `https://onemovie.in/movie/${slug}`,
    identifier: slug,
    title: title,
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="mt-10 bg-card p-4 sm:p-6 rounded-xl border border-border w-full mx-auto" style={{colorScheme: 'dark'}}>
      <h3 className="text-xl font-bold text-foreground mb-4">Leave a Comment</h3>
      {isMounted && (
        <DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      )}
    </div>
  );
}
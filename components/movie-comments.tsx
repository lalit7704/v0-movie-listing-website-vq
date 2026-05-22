"use client";
import { DiscussionEmbed } from "disqus-react";

interface MovieCommentsProps {
  slug: string;
  title: string;
}

export function MovieComments({ slug, title }: MovieCommentsProps) {
  const disqusShortname = "onemovie-2";

  const disqusConfig = {
    url: `https://onemovie.in/movie/${slug}`,
    identifier: slug,
    title: title,
  };

  return (
    <div className="mt-10 bg-card p-4 sm:p-6 rounded-xl border border-border w-full mx-auto" style={{colorScheme: 'dark'}}>
      <h3 className="text-xl font-bold text-foreground mb-4">Leave a Comment</h3>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
}
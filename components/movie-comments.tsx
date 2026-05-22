"use client";

import { DiscussionEmbed } from 'disqus-react';

interface MovieCommentsProps {
  slug: string;
  title: string;
}

export function MovieComments({ slug, title }: MovieCommentsProps) {
  // Aapka naya Disqus shortname
  const disqusShortname = "one-movie"; 
  
  const disqusConfig = {
    url: `https://onemovie.in/movie/${slug}`,
    identifier: slug,
    title: title,
    language: 'hi_IN'
  };

  return (
    <div className="mt-10 bg-card p-4 sm:p-6 rounded-xl border border-border w-full mx-auto">
      <h3 className="text-xl font-bold text-foreground mb-4">Leave a Comment</h3>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
}
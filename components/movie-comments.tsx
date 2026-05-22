"use client";

import { DiscussionEmbed } from 'disqus-react';
import dynamic from 'next/dynamic';

interface MovieCommentsProps {
  slug: string;
  title: string;
}

const DynamicDiscussionEmbed = dynamic(() => import('disqus-react').then(m => m.DiscussionEmbed), { ssr: false });

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
      <DynamicDiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
}
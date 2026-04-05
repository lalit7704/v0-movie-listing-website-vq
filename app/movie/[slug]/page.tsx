import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Download, Star, Clock, Calendar, Globe, Film, ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { VideoPlayer } from "@/components/video-player";
import { SectionSlider } from "@/components/section-slider";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { videos, getVideoBySlug, Video } from "@/data/videos";
import { getRelatedMovies, generateBreadcrumbs } from "@/lib/internal-links";
import {
  generateSlug,
  generateCanonicalUrl,
  generateSEOTitle,
  generateMetaDescription,
} from "@/lib/seo-utils";
import { generateMoviePageJsonLd } from "@/lib/structured-data";

interface MoviePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return videos.map((video) => ({
    slug: generateSlug(video.title),
  }));
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Try to find by slug first
  let video = getVideoBySlug(slug);
  
  // Fallback: search by generated slug from title
  if (!video) {
    video = videos.find((v) => generateSlug(v.title) === slug);
  }

  if (!video) {
    return {
      title: "Movie Not Found - Onemovie",
      description: "The movie you&apos;re looking for couldn&apos;t be found.",
    };
  }

  const canonicalUrl = generateCanonicalUrl(slug);
  const seoTitle = generateSEOTitle(video.title, video.category);
  const metaDescription = generateMetaDescription(video.description);
  const imageUrl = video.poster;

  return {
    title: seoTitle,
    description: metaDescription,
    keywords: [
      video.title,
      ...video.genre,
      video.category,
      "watch online",
      "streaming",
      "free movies",
    ].join(", "),
    canonical: canonicalUrl,
    authors: video.director ? [{ name: video.director }] : undefined,
    openGraph: {
      title: video.title,
      description: metaDescription,
      url: canonicalUrl,
      type: "video.movie",
      images: [
        {
          url: imageUrl,
          width: 400,
          height: 600,
          alt: video.title,
        },
      ],
      siteName: "Onemovie",
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description: metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { slug } = await params;

  // Try to find by slug first
  let video = getVideoBySlug(slug);

  // Fallback: search by generated slug from title
  if (!video) {
    video = videos.find((v) => generateSlug(v.title) === slug);
  }

  if (!video) {
    notFound();
  }

  const recommendedVideos = getRelatedMovies(video.id, 12);
  const breadcrumbs = generateBreadcrumbs(video.title, video.category, slug);
  const jsonLdScripts = generateMoviePageJsonLd(
    video.title,
    video.description,
    video.poster,
    video.year,
    video.rating,
    video.genre,
    video.language,
    video.duration,
    video.director,
    video.cast
  );

  return (
    <>
      <Script
        id="movie-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdScripts),
        }}
      />
      <main className="min-h-screen bg-background">
        <Navbar />

        {/* Main Content */}
        <div className="pt-20 pb-8">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                {breadcrumbs.map((item, index) => (
                  <li key={item.url} className="flex items-center gap-2">
                    {index > 0 && <span className="text-xs">›</span>}
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-foreground font-medium">{item.name}</span>
                    ) : (
                      <Link href={item.url} className="hover:text-foreground transition-colors">
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            {/* Back Button */}
            <Link href="/">
              <Button
                variant="ghost"
                className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Video Player and Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Video Player */}
                <VideoPlayer
                  videoUrl={video.videoUrl}
                  poster={video.poster}
                  title={video.title}
                />

                {/* Title and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {video.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-foreground font-medium">{video.rating}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{video.duration}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{video.year}</span>
                      </div>
                    </div>
                  </div>

                  <a href={video.downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </a>
                </div>

                {/* Quality Badge */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-sm font-semibold bg-primary text-primary-foreground rounded">
                    {video.quality}
                  </span>
                  {video.genre.map((genre) => (
                    <span key={genre} className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded">
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h2 className="text-lg font-semibold text-foreground mb-3">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {video.description}
                  </p>
                </div>

                {/* Movie Details */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Movie Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Globe className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Language</p>
                        <p className="text-foreground font-medium">{video.language}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Film className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="text-foreground font-medium">{video.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="text-foreground font-medium">{video.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Release Year</p>
                        <p className="text-foreground font-medium">{video.year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Poster and Quick Info */}
              <div className="space-y-6">
                {/* Poster */}
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={video.poster}
                    alt={video.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 text-sm font-semibold bg-primary text-primary-foreground rounded shadow-lg">
                      {video.quality}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/70 rounded">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-foreground font-medium">{video.rating}</span>
                  </div>
                </div>

                {/* Quick Download */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Quick Download</h3>
                  <div className="space-y-3">
                    <a href={video.downloadUrl} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full justify-between">
                        <span>480p - SD</span>
                        <Download className="w-4 h-4" />
                      </Button>
                    </a>
                    <a href={video.downloadUrl} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full justify-between">
                        <span>720p - HD</span>
                        <Download className="w-4 h-4" />
                      </Button>
                    </a>
                    <a href={video.downloadUrl} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full justify-between">
                        <span>1080p - Full HD</span>
                        <Download className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Share */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Share This Movie</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Movies */}
        <SectionSlider title="You May Also Like" videos={recommendedVideos} />

        <Footer />
      </main>
    </>
  );
}

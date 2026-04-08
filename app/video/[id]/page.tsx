import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Download, Star, Clock, Calendar, Globe, Film, ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { VideoPlayer } from "@/components/video-player";
import { SectionSlider } from "@/components/section-slider";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { getVideoById, getRecommendedVideos, videos } from "@/data/videos";

interface VideoPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return videos.map((video) => ({
    id: video.id,
  }));
}

export async function generateMetadata({ params }: VideoPageProps) {
  const { id } = await params;
  const video = getVideoById(id);

  if (!video) {
    return {
      title: "Video Not Found - Onemovie",
    };
  }

  return {
    title: `${video.title} - Watch on Onemovie`,
    description: video.description,
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params;
  const video = getVideoById(id);

  if (!video) {
    notFound();
  }

  const recommendedVideos = getRecommendedVideos(id);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <div className="pt-20 pb-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-4 -ml-2 text-muted-foreground hover:text-foreground">
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
                  <span
                    key={genre}
                    className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded"
                  >
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
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
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
                  <a
                    href={video.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full justify-between">
                      <span>480p - SD</span>
                      <Download className="w-4 h-4" />
                    </Button>
                  </a>
                  <a
                    href={video.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full justify-between">
                      <span>720p - HD</span>
                      <Download className="w-4 h-4" />
                    </Button>
                  </a>
                  <a
                    href={video.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
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
  );
}

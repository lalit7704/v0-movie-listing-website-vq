import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSlider } from "@/components/hero-slider";
import { SectionSlider } from "@/components/section-slider";
import { videos, getFeaturedVideos } from "@/data/videos";
import { PersonalizedHomeSections } from "@/components/personalized-home-sections";
import { tmdbRecentlyAddedVideos } from "@/data/tmdb-generated";

const categoryLinks = [
  { href: "/bollywood", label: "Bollywood" },
  { href: "/hollywood", label: "Hollywood" },
  { href: "/south-indian", label: "South Indian" },
  { href: "/web-series", label: "Web Series" },
  { href: "/cartoons", label: "Cartoons" },
];

export default function HomePage() {
  // Get different categories for sliders
  const heroVideos = getFeaturedVideos();
  const trendingVideos = videos.slice(0, 12);
  const newReleases = [...videos].sort((a, b) => b.year - a.year).slice(0, 12);
  const bollywoodVideos = videos.filter(v => v.category === "Bollywood" || v.genre.includes("Bollywood")).slice(0, 12);
  const hollywoodVideos = videos.filter(v => v.category === "Hollywood" || v.genre.includes("Hollywood")).slice(0, 12);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pb-12">
        {/* Hero Section */}
        <HeroSlider videos={heroVideos} />

      

        {/* Main Content Sections */}
        <div className="pt-8 space-y-4">
          <PersonalizedHomeSections />
          <SectionSlider title="Newly Added Automatically" videos={tmdbRecentlyAddedVideos.slice(0, 20)} />
          <SectionSlider title="Trending Now" videos={trendingVideos} />
          <SectionSlider title="New Releases" videos={newReleases} />
          <SectionSlider title="Bollywood Hits" videos={bollywoodVideos} />
          <SectionSlider title="Hollywood Blockbusters" videos={hollywoodVideos} />
        </div>

        <section className="mx-auto mt-12 max-w-[1400px] px-4 sm:px-6 lg:px-8" aria-labelledby="how-onemovie-works">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 id="how-onemovie-works" className="text-2xl font-bold text-foreground">
              Find something worth watching
            </h2>
            <div className="mt-4 grid gap-6 text-sm leading-7 text-muted-foreground md:grid-cols-3">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Browse by cinema and genre</h3>
                <p>
                  Use the Bollywood, Hollywood, South Indian, web-series and cartoon collections to narrow the catalogue. Genre pages make it easier to compare action, comedy, drama, thriller and science-fiction titles without relying on a single trending list.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Check the details first</h3>
                <p>
                  Each title page brings together its synopsis, release year, language, running time, genres, cast and director information when available. Ratings are a discovery signal, not an Onemovie review or a guarantee that a title will suit every viewer.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">How the catalogue is maintained</h3>
                <p>
                  Listings are organised and corrected as information becomes available. Onemovie does not claim ownership of third-party artwork or metadata. Learn more about our purpose and sourcing on the <Link href="/about" className="text-primary hover:underline">About page</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

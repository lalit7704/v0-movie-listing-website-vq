import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSlider } from "@/components/hero-slider";
import { SectionSlider } from "@/components/section-slider";
import { videos } from "@/data/videos";
import Adsense from "@/components/Adsense";

export default function HomePage() {
  // Get different categories for sliders
  const heroVideos = videos.slice(0, 5);
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

        {/* Flixfox Section */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center justify-center w-full bg-card border border-border hover:border-primary rounded-xl p-4 sm:p-6 transition-all duration-300 group shadow-sm hover:shadow-md"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              🎬 Visit Flixfox
            </h2>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Explore more premium movies and web series
            </p>
          </a>
        </div>

        {/* Main Content Sections */}
        <div className="pt-8 space-y-4">
          <SectionSlider title="Trending Now" videos={trendingVideos} />
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 my-6">
            <Adsense />
          </div>
          <SectionSlider title="New Releases" videos={newReleases} />
          <SectionSlider title="Bollywood Hits" videos={bollywoodVideos} />
          <SectionSlider title="Hollywood Blockbusters" videos={hollywoodVideos} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
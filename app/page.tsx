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

        {/* Main Content Sections */}
        <div className="pt-8 space-y-4">
          <SectionSlider title="Trending Now" videos={trendingVideos} />
          <SectionSlider title="New Releases" videos={newReleases} />
          <SectionSlider title="Bollywood Hits" videos={bollywoodVideos} />
          <SectionSlider title="Hollywood Blockbusters" videos={hollywoodVideos} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

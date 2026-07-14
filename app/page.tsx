import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSlider } from "@/components/hero-slider";
import { SectionSlider } from "@/components/section-slider";
import { videos, getFeaturedVideos } from "@/data/videos";
import Adsense from "@/components/Adsense";
import { PersonalizedHomeSections } from "@/components/personalized-home-sections";

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

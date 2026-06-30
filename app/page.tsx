import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSlider } from "@/components/hero-slider";
import { SectionSlider } from "@/components/section-slider";
import { videos } from "@/data/videos";
import Adsense from "@/components/Adsense";

const categoryLinks = [
  { href: "/bollywood", label: "Bollywood" },
  { href: "/hollywood", label: "Hollywood" },
  { href: "/south-indian", label: "South Indian" },
  { href: "/web-series", label: "Web Series" },
  { href: "/cartoons", label: "Cartoons" },
];

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

        {/* Category Navigation */}
        <nav
          aria-label="Movie categories"
          className="border-y border-border bg-background"
        >
          <div className="max-w-[1400px] mx-auto overflow-x-auto px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-max items-center gap-8 py-4">
              {categoryLinks.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

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

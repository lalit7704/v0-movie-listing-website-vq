import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Script from "next/script";
import { HeroSlider } from "@/components/hero-slider";
import { SectionSlider } from "@/components/section-slider";
import { videos } from "@/data/videos";
import { PersonalizedHomeSections } from "@/components/personalized-home-sections";
import {
  tmdbRecentlyAddedVideos,
  tmdbHollywoodVideos,
  tmdbBollywoodVideos,
} from "@/data/tmdb-generated";

export default function HomePage() {
  // Get different categories for sliders
  const heroVideos = [
    ...tmdbHollywoodVideos,
    ...tmdbBollywoodVideos,
  ]
    .filter(v => v.poster && v.rating && v.rating > 1) // Ensure poster and some rating exists
    .sort((a, b) => b.rating - a.rating) // Sort by highest rating
    .slice(0, 10); // Take top 10

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
          <Script id="adsterra-options" strategy="afterInteractive">
  {`
    atOptions = {
      'key' : '7c667e553996e0e3bf38f87820a7f1bb',
      'format' : 'iframe',
      'height' : 60,
      'width' : 468,
      'params' : {}
    };
  `}
</Script>

<Script
  id="adsterra-invoke"
  src="https://rufflefireballcherries.com/7c667e553996e0e3bf38f87820a7f1bb/invoke.js"
  strategy="afterInteractive"
/>
          <div
    style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px 0',
    }}
  >
    <a
      href="https://beta.publishers.adsterra.com/referral/Gub813udiq"
      rel="nofollow"
      target="_blank"
    >
      <img
        src="https://landings-cdn.adsterratech.com/referralBanners/gif/120x60_adsterra_reff.gif"
        alt="Adsterra"
        width="120"
        height="60"
      />
    </a>
  </div>
          <SectionSlider title="Newly Added Automatically" videos={tmdbRecentlyAddedVideos.slice(0, 20)} />
          <SectionSlider title="Trending Now" videos={trendingVideos} />
          <div id="container-3a306c8c6706d3ba2b33e82328472b63"></div>
          <SectionSlider title="New Releases" videos={newReleases} />
          <SectionSlider title="Bollywood Hits" videos={bollywoodVideos} />
          <SectionSlider title="Hollywood Blockbusters" videos={hollywoodVideos} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

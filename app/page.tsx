import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSlider } from "@/components/hero-slider";
import { SectionSlider } from "@/components/section-slider";
import { getRecentlyAddedVideos, videos } from "@/data/videos";
import { PersonalizedHomeSections } from "@/components/personalized-home-sections";

export default function HomePage() {
  // Newest additions to the site lead the page: 5 in the hero, more in the row below it
  const latestAdded = getRecentlyAddedVideos(15);
  const heroVideos = latestAdded.slice(0, 5);

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
          <SectionSlider title="Latest Added" videos={latestAdded} />
          <PersonalizedHomeSections />
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

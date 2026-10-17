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

  // Category rows, each newest-added first
  const bollywoodVideos = getRecentlyAddedVideos(15, "Bollywood");
  const hollywoodVideos = getRecentlyAddedVideos(15, "Hollywood");
  const southIndianVideos = getRecentlyAddedVideos(15, "South Indian");
  const webSeriesVideos = getRecentlyAddedVideos(15, "Web Series");

  const trendingVideos = videos.slice(0, 12);
  const newReleases = [...videos].sort((a, b) => b.year - a.year).slice(0, 12);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pb-12">
        {/* Hero Section */}
        <HeroSlider videos={heroVideos} />

      

        {/* Main Content Sections */}
        <div className="pt-8 space-y-4">
          <SectionSlider title="Latest Added" videos={latestAdded} />
          <SectionSlider title="Bollywood" videos={bollywoodVideos} />
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
          <SectionSlider title="Hollywood" videos={hollywoodVideos} />
          <div id="container-3a306c8c6706d3ba2b33e82328472b63"></div>
          <SectionSlider title="South Indian" videos={southIndianVideos} />
          <SectionSlider title="Web Series" videos={webSeriesVideos} />
          <PersonalizedHomeSections />
          <SectionSlider title="Trending Now" videos={trendingVideos} />
          <SectionSlider title="New Releases" videos={newReleases} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

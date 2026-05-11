import { Navbar } from "@/components/navbar";
import { HeroSlider } from "@/components/hero-slider";
import Adsense from "@/components/Adsense";
import { SectionSlider } from "@/components/section-slider";
import { Footer } from "@/components/footer";

import {
  videos,
  getFeaturedVideos,
  getLatestVideos,
  getTrendingVideos,
  getPopularVideos,
  getTopRatedVideos,
  getVideosByCategory,
  getVideosByGenre,
  getUpcomingVideos,
  getHindiDubbedVideos,
  getCartoonVideos,
  getAnimeVideos,
  getKidsCartoons,
} from "@/data/videos";

export default function HomePage() {
  const featuredVideos = getFeaturedVideos();
  const latestVideos = getLatestVideos();
  const trendingVideos = getTrendingVideos();
  const popularVideos = getPopularVideos();
  const topRatedVideos = getTopRatedVideos();
  const bollywoodVideos = getVideosByCategory("Bollywood");
  const hollywoodVideos = getVideosByCategory("Hollywood");
  const ramayanVideos = getVideosByCategory("Ramayan");
  const mahabharatVideos = getVideosByCategory("Mahabharat");
  const southIndianVideos = getVideosByCategory("South Indian");
  const webSeriesVideos = getVideosByCategory("Web Series");
  const actionVideos = getVideosByGenre("Action");
  const comedyVideos = getVideosByCategory("Comedy");
  const dramaVideos = getVideosByGenre("Drama");
  const upcomingVideos = getUpcomingVideos();
  const hindiDubbedVideos = getHindiDubbedVideos();
  const thrillerVideos = getVideosByGenre("Thriller");
  const sciFiVideos = getVideosByGenre("Sci-Fi");
  const cartoonVideos = getCartoonVideos();
  const animeVideos = getAnimeVideos();
  const kidsCartoons = getKidsCartoons();
  const recentlyAdded = [...videos].slice(0, 10);
  const editorsPicks = [...videos]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Slider */}
      <HeroSlider videos={featuredVideos} />

      {/* Top Ad */}
      <div className="px-4 py-4">
        <Adsense />
      </div>

      {/* Content Sections */}
      <div className="space-y-2">

        {/* 1. Latest Movies */}
        <SectionSlider title="Latest Movies" videos={latestVideos} />

        {/* 2. Trending Now */}
        <SectionSlider title="Trending Now" videos={trendingVideos} />

        {/* Middle Ad */}
        <div className="px-4 py-4">
          <Adsense />
        </div>

        {/* 3. Popular Movies */}
        <SectionSlider title="Popular Movies" videos={popularVideos} />

        {/* 4. Recently Added */}
        <SectionSlider title="Recently Added" videos={recentlyAdded} />

        {/* 5. Top Rated Movies */}
        <SectionSlider title="Top Rated Movies" videos={topRatedVideos} />

        {/* 6. Bollywood Movies */}
        <SectionSlider
          title="Bollywood Movies"
          videos={bollywoodVideos}
          id="bollywood"
        />

        {/* 7. Hollywood Movies */}
        <SectionSlider
          title="Hollywood Movies"
          videos={hollywoodVideos}
          id="hollywood"
        />

        {/* Ramayan */}
        <SectionSlider
          title="Ramayan"
          videos={ramayanVideos}
          id="ramayan"
        />

        {/* Mahabharat */}
        <SectionSlider
          title="Mahabharat"
          videos={mahabharatVideos}
          id="mahabharat"
        />

        {/* Ad */}
        <div className="px-4 py-4">
          <Adsense />
        </div>

        {/* South Indian Movies */}
        <SectionSlider
          title="South Indian Movies"
          videos={southIndianVideos}
          id="south-indian"
        />

        {/* Hindi Dubbed Movies */}
        <SectionSlider
          title="Hindi Dubbed Movies"
          videos={hindiDubbedVideos}
        />

        {/* Web Series */}
        <SectionSlider
          title="Web Series"
          videos={webSeriesVideos}
          id="web-series"
        />

        {/* Cartoon Shows & Movies */}
        <SectionSlider
          title="Cartoon Shows & Movies"
          videos={cartoonVideos}
          id="cartoons"
        />

        {/* Anime */}
        <SectionSlider
          title="Anime"
          videos={animeVideos}
          id="anime"
        />

        {/* Kids Cartoons */}
        <SectionSlider
          title="Kids Cartoons"
          videos={kidsCartoons}
          id="kids"
        />

        {/* Action Movies */}
        <SectionSlider
          title="Action Movies"
          videos={actionVideos}
          id="action"
        />

        {/* Comedy Movies */}
        <SectionSlider
          title="Comedy Movies"
          videos={comedyVideos}
          id="comedy"
        />

        {/* Drama Movies */}
        <SectionSlider
          title="Drama Movies"
          videos={dramaVideos}
          id="drama"
        />

        {/* Thriller Movies */}
        <SectionSlider
          title="Thriller Movies"
          videos={thrillerVideos}
          id="thriller"
        />

        {/* Sci-Fi Movies */}
        <SectionSlider
          title="Sci-Fi Movies"
          videos={sciFiVideos}
          id="sci-fi"
        />

        {/* Editor's Picks */}
        <SectionSlider
          title="Editor's Picks"
          videos={editorsPicks}
        />

        {/* Bottom Ad */}
        <div className="px-4 py-4">
          <Adsense />
        </div>

        {/* Upcoming Movies */}
        <SectionSlider
          title="Upcoming Movies"
          videos={upcomingVideos}
        />

        {/* Recommended */}
        <SectionSlider
          title="Recommended For You"
          videos={[...videos]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10)}
        />
      </div>

      <Footer />
    </main>
  );
}
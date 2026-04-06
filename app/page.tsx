import { Navbar } from "@/components/navbar";
import { HeroSlider } from "@/components/hero-slider";
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
  const editorsPicks = [...videos].sort(() => Math.random() - 0.5).slice(0, 10);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Slider */}
      <HeroSlider videos={featuredVideos} />

      {/* Content Sections - 18 Sections */}
      <div className="space-y-2">
        {/* 1. Latest Movies */}
        <SectionSlider title="Latest Movies" videos={latestVideos} />

        {/* 2. Trending Now */}
        <SectionSlider title="Trending Now" videos={trendingVideos} />

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

        {/* 7. Ramayan */}
        <SectionSlider
          title="Ramayan "
          videos={ramayanVideos}
          id="ramayan"
        />
        {/* 7. Mahabharat */}
        <SectionSlider
          title="Mahabharat "
          videos={mahabharatVideos}
          id="mahabharat"
        />
        {/* 8. South Indian Movies */}
        <SectionSlider
          title="South Indian Movies"
          videos={southIndianVideos}
          id="south-indian"
        />

        {/* 9. Hindi Dubbed Movies */}
        <SectionSlider
          title="Hindi Dubbed Movies"
          videos={hindiDubbedVideos}
        />

        {/* 10. Web Series */}
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

        {/* 11. Action Movies */}
        <SectionSlider
          title="Action Movies"
          videos={actionVideos}
          id="action"
        />

        {/* 12. Comedy Movies */}
        <SectionSlider
          title="Comedy Movies"
          videos={comedyVideos}
          id="comedy"
        />

        {/* 13. Drama Movies */}
        <SectionSlider
          title="Drama Movies"
          videos={dramaVideos}
          id="drama"
        />

        {/* 14. Thriller Movies */}
        <SectionSlider
          title="Thriller Movies"
          videos={thrillerVideos}
          id="thriller"
        />

        {/* 15. Sci-Fi Movies */}
        <SectionSlider
          title="Sci-Fi Movies"
          videos={sciFiVideos}
          id="sci-fi"
        />

        {/* 14. Thriller Movies */}
        <SectionSlider
          title="Thriller Movies"
          videos={thrillerVideos}
          id="thriller"
        />

        {/* 16. Editor's Picks */}
        <SectionSlider title="Editor's Picks" videos={editorsPicks} />

        {/* 17. Upcoming Movies */}
        <SectionSlider title="Upcoming Movies" videos={upcomingVideos} />

        {/* 18. Recommended For You */}
        <SectionSlider
          title="Recommended For You"
          videos={[...videos].sort(() => Math.random() - 0.5).slice(0, 10)}
        />
      </div>

      <Footer />
    </main>

  );
}

import { Navbar } from "@/components/navbar";
import { HeroSlider } from "@/components/hero-slider";
import Adsense from "@/components/Adsense";
import { SectionSlider } from "@/components/section-slider";
import { Footer } from "@/components/footer";
import { AmazonAd } from "@/components/amazon-ad";

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

      {/* FlixFox App Banner */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto mt-8">
        <a 
          href="https://filmm.me/3dRs94d1" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
        >
          <img 
            src="https://cdn.shopify.com/s/files/1/0649/9945/6854/files/Gemini_Generated_Image_b2z1axb2z1axb2z1_1.png?v=1779466927" 
            alt="Download FlixFox App" 
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </a>
      </div>

      {/* Content Sections */}
      <div className="space-y-2">

        {/* 1. Latest Movies */}
        <SectionSlider title="Latest Movies" videos={latestVideos} />

        {/* 2. Trending Now */}
        <SectionSlider title="Trending Now" videos={trendingVideos} />

        <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <AmazonAd 
          title="REDMI Note 15 Pro 5G – 200MP OIS Camera, Dimensity 7400-Ultra, 17.3cm CrystalRes AMOLED Display, 6580mAh Battery & 45W Fast Charging (Silver Ash, 8GB+128GB)"
          description="Advanced 200MP camera with 4th Gen HPE sensor giving flagship clarity at all focal lengths; AI ultra clear engine having 4k video with in-sensor 2x/4x zoom"
          imageUrl="https://m.media-amazon.com/images/I/81UgjzCNSrL._SL1500_.jpg"
          productUrl="https://amzn.in/d/04mtImI5"
          buttonText="Check Price on Amazon"
        />
      </div>

        {/* 3. Popular Movies */}
        <SectionSlider title="Popular Movies" videos={popularVideos} />
        <AmazonAd 
          title="Samsung Galaxy S26 Ultra 5G – AI Phone with 200MP Camera, Snapdragon 8 Elite Gen 5, Built-in Privacy Display & 5000mAh Battery (Black, 12GB+256GB)"
          description="Premium AI smartphone featuring a 200MP flagship camera, Photo Assist, Creative Studio, Snapdragon 8 Elite Gen 5 processor, built-in privacy display, and powerful all-day 5000mAh battery."
          imageUrl="https://m.media-amazon.com/images/I/71VnqxM-+AL._SL1500_.jpg"
          productUrl="https://amzn.in/d/0975SFmX"
          buttonText="Check Price on Amazon"
        />
        {/* 4. Recently Added */}
        <SectionSlider title="Recently Added" videos={recentlyAdded} />

        {/* 5. Top Rated Movies */}
        <SectionSlider title="Top Rated Movies" videos={topRatedVideos} />
        <AmazonAd 
          title="OnePlus 13 5G – Snapdragon 8 Elite, Hasselblad Triple Camera, 2K ProXDR Display & 6000mAh Battery (Midnight Ocean, 12GB+256GB)"
          description="Flagship smartphone powered by Snapdragon 8 Elite with OxygenOS 15, 50MP Hasselblad triple camera setup, stunning 2K 120Hz ProXDR display, IP68/IP69 durability, and ultra-fast 100W charging."
          imageUrl="https://m.media-amazon.com/images/I/71vRZZ+FCiL._SL1500_.jpg"
          productUrl="https://amzn.in/d/07iSfrWV"
          buttonText="Check Price on Amazon"
        />
        {/* 6. Bollywood Movies */}
        <SectionSlider
          title="Bollywood Movies"
          videos={bollywoodVideos}
          id="bollywood"
        />
      <AmazonAd 
        title="SJCAM SJ20 Dual Lens Action Camera – 4K Recording, Night Vision, Waterproof & Long Battery Life"
        description="Dual-lens action camera with advanced night vision, 4K video recording, waterproof design, live streaming support, and extended battery backup for travel, biking, and adventure shooting."
        imageUrl="https://m.media-amazon.com/images/I/81X9mq8aJ1L._SL1500_.jpg"
        productUrl="https://amzn.in/d/05xtr5rk"
        buttonText="Check Price on Amazon"
      />
        {/* 7. Hollywood Movies */}
        <SectionSlider
          title="Hollywood Movies"
          videos={hollywoodVideos}
          id="hollywood"
        />
        <AmazonAd 
        title="Stuffcool Click 20000mAh Magnetic Wireless Powerbank – 20W Fast Charging with Built-in Stand & Type-C Port"
        description="Premium magnetic wireless powerbank with 20000mAh capacity, strong MagSafe-compatible attachment, 20W PD fast charging, built-in stand, and compact travel-friendly design."
        imageUrl="https://m.media-amazon.com/images/I/51Lo48bbYSL._SL1200_.jpg"
        productUrl="https://amzn.in/d/07g0uJNU"
        buttonText="Check Price on Amazon"
      />
        {/* Ramayan */}
        <SectionSlider
          title="Ramayan"
          videos={ramayanVideos}
          id="ramayan"
        />
        <AmazonAd 
        title="Gear Canyon Water-Resistant Backpack – Stylish Laptop & Travel Bag for Men and Women"
        description="Modern water-resistant backpack with spacious compartments, durable build quality, laptop storage, and a lightweight fashionable design ideal for college, office, and travel use."
        imageUrl="https://m.media-amazon.com/images/I/711y8cjWyIL._SX679_.jpg"
        productUrl="https://amzn.in/d/013vNROg"
        buttonText="Check Price on Amazon"
      />
        {/* Mahabharat */}
        <SectionSlider
          title="Mahabharat"
          videos={mahabharatVideos}
          id="mahabharat"
        />

        {/* South Indian Movies */}
        <SectionSlider
          title="South Indian Movies"
          videos={southIndianVideos}
          id="south-indian"
        />
        <AmazonAd 
          title="FUR JADEN Eco-Friendly Backpack – Water Resistant Laptop & Travel Bag for Men and Women"
          description="Stylish and sustainable backpack made with eco-friendly materials, featuring water-resistant protection, spacious compartments, laptop storage, and a lightweight everyday travel design."
          imageUrl="https://m.media-amazon.com/images/I/71lQpajLA-L._SX679_.jpg"
          productUrl="https://amzn.in/d/0e6cbMSN"
          buttonText="Check Price on Amazon"
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
      <AmazonAd 
          title="WZATCO Yuva Horizon Smart Projector – Native 1080P, 4K Support, Google TV & 1500 ANSI Brightness"
          description="Premium smart projector with native 1080P resolution, 4K Ultra HD support, official Google TV, fully automatic setup, dust-free design, and 1500 ANSI ultra-bright display for home cinema experience."
          imageUrl="https://m.media-amazon.com/images/I/71tRj0lYPJL._SL1500_.jpg"
          productUrl="https://amzn.in/d/08NHCEfL"
          buttonText="Check Price on Amazon"
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
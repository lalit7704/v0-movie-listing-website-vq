import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSlider } from "@/components/hero-slider";
import { SectionSlider } from "@/components/section-slider";
import { getRecentlyAddedVideos } from "@/data/videos";
import { PersonalizedHomeSections } from "@/components/personalized-home-sections";
import { ProductSlider } from "@/components/product-slider";

export default function HomePage() {
  // Newest additions to the site lead the page: 5 in the hero, more in the row below it
  const latestAdded = getRecentlyAddedVideos(15);
  const heroVideos = latestAdded.slice(0, 5);

  // Category rows, each newest-added first
  const bollywoodVideos = getRecentlyAddedVideos(15, "Bollywood");
  const hollywoodVideos = getRecentlyAddedVideos(15, "Hollywood");
  const southIndianVideos = getRecentlyAddedVideos(15, "South Indian");
  const webSeriesVideos = getRecentlyAddedVideos(15, "Web Series");
  const hotSeriesVideos = getRecentlyAddedVideos(15, "Hot Series");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pb-12">
        {/* Hero Section */}
        <HeroSlider videos={heroVideos} />

      

        {/* Main Content Sections */}
        <div className="pt-8 space-y-4">
          <SectionSlider title="Latest Added" videos={latestAdded} />
          <ProductSlider sectionId="diwali-specials" />
          <SectionSlider title="Bollywood" videos={bollywoodVideos} />
          <ProductSlider sectionId="trending-products" />
          <SectionSlider title="Hollywood" videos={hollywoodVideos} />
          <SectionSlider title="South Indian" videos={southIndianVideos} />
          <SectionSlider title="Web Series" videos={webSeriesVideos} />
          <SectionSlider title="Hot Series" videos={hotSeriesVideos} />
          <PersonalizedHomeSections />
       
        </div>
      </main>

      <Footer />
    </div>
  );
}

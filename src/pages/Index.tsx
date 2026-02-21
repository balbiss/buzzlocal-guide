import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickFilters from "@/components/QuickFilters";
import Categories from "@/components/Categories";
import FeaturedEvents from "@/components/FeaturedEvents";
import ForOrganizers from "@/components/ForOrganizers";
import HowItWorks from "@/components/HowItWorks";
import SocialProof from "@/components/SocialProof";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <QuickFilters />
      <FeaturedEvents />
      <Categories />
      <ForOrganizers />
      <HowItWorks />
      <SocialProof />
      <BlogPreview />
      <Footer />
    </div>
  );
};

export default Index;

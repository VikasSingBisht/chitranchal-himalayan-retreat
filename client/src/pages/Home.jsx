import HeroSection from "../components/HeroSection";
import ScrollRevealText from "../components/ScrollRevealText";
import StickyScrollReveal from "../components/StickyScrollReveal";
import ItinerarySlider from "../components/ItinerarySlider";
import MapSection from "../components/MapSection";
import HiddenGems from "../components/HiddenGems";
import BlogSection from "../components/BlogSection";
import FAQSection from "../components/FAQSection";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <ScrollRevealText />
      <StickyScrollReveal />
      <ItinerarySlider />
      <MapSection />
      <HiddenGems />
      <BlogSection />
      <FAQSection />
      <Newsletter />
    </main>
  );
};

export default Home;

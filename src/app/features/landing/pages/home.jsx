import Header from "../components/header";
import HeroSection from "../components/hero-section";
import Main from "../components/main";
import Footer from "../components/footer";
function LandingHomePage() {
  return (
    <div className="flex bg-gray-50 flex-col gap[8rem]">
      <HeroSection />
      <Main />
      <Footer />
    </div>
  );
}

export default LandingHomePage;

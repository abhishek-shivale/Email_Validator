import Faq from "@/components/global/Faq";
import Footer from "@/components/global/Footer";
import HeroSection from "@/components/global/Herosection";
import Promotion from "@/components/global/Promotion";

export default function Home() {
  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <HeroSection />
      <Promotion />
      <Faq />
      <Footer />
    </div>
  );
}

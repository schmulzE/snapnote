import Navbar from "@/app/components/shared/navbar";
import Footer from "@/app/components/shared/footer";
import HeroSection from "./components/home/heroSection";
import Subscribe from "./components/home/subscribe";
import Features from "./components/home/features";
import Pricing from "./components/home/pricing";
import Testimonial from "./components/home/testimonials";

export default function Home() {
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <Features/>
      <Testimonial/>
      <Pricing/>
      <Subscribe/>
      <Footer/>
    </>
  );
}

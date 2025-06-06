"use client"

import Stats from "./components/home/stats";
import Navbar from "./components/shared/navbar";
import Features from "./components/home/features";
import Footer from "@/app/components/shared/footer";
import HowItWorks from "./components/home/howItWorks";
import HeroSection from "./components/home/heroSection";
import CallToAction from "./components/home/callToAction";

export default function NoteTakingLanding() {
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 font-mono">
      <Navbar/>
      <HeroSection/>
      <Features/>
      <HowItWorks/>
      <Stats/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

"use client";

import { Cta } from "@/components/Cta";
import { FeatureSection } from "@/components/FeatureSection";
import { FooterSection } from "@/components/FooterSection";
import { HeroSection } from "@/components/HeroSection";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LandingPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".HeroSection", {
      scrollTrigger: {
        trigger: ".HeroSection",
        start: "top top",
        scrub: 1,
      },
      opacity: 0,
      scale: 0.9,
      duration: 10,
      ease: "none",
    });
  }, []);
  return (
    <main className="relative">
      <HeroSection />
      <FeatureSection />
      <Cta />
      <FooterSection />
    </main>
  );
}

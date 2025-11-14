"use client";

import { Cta } from "@/components/Cta";
import { FeatureSection } from "@/components/FeatureSection";
import { FooterSection } from "@/components/FooterSection";
import { HeroSection } from "@/components/HeroSection";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisRef, ReactLenis } from "lenis/react";
import { NavbarMenu } from "@/components/NavbarMenu";

export default function LandingPage() {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

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

    return () => gsap.ticker.remove(update);
  }, []);
  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}
    >
      <main className="relative">
        <NavbarMenu />
        <HeroSection />
        <FeatureSection />
        <Cta />
        <FooterSection />
      </main>
    </ReactLenis>
  );
}

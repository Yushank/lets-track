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
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    gsap.registerPlugin(ScrollTrigger);

    //wrapped everything inside gsap.context for it to wait a bit for layout to settle
    const ctx = gsap.context(() => {
      //this is for fade in when load
      gsap.fromTo(
        ".HeroSection",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 2,
          ease: "sine.inOut",
          onComplete: () => {
            //after initial fade animation complete then only create scrolltrigger for scroll animation (this prevents mixups and completing both at same time)
            ScrollTrigger.create({
              trigger: ".HeroSection",
              start: "top top",
              scrub: 1,
              onUpdate: (self) => {
                //here we are using onUpdate for more cotrol over animation
                //instead of writing just opacity 0, we are writing 1-self.proggress
                //means it will progress like this (1-0, 1-0.5, 1-1) to get to 0
                gsap.to(".HeroSection", {
                  opacity: 1 - self.progress,
                  scale: 1 - self.progress * 0.1,
                  duration: 0,
                });
              },
            });
          },
        }
      );
    });
    // gsap.to(".HeroSection", {
    //   scrollTrigger: {
    //     trigger: ".HeroSection",
    //     start: "top top",
    //     scrub: 1,
    //   },
    //   opacity: 0,
    //   scale: 0.9,
    //   duration: 10,
    //   ease: "none",
    // });

    return () => {
      ctx.revert();
      gsap.ticker.remove(update);
    };
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

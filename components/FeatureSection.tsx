"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { Container } from "./Container";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const FeatureSection = () => {
  return (
    <section className="FeatureSection relative z-10 bg-white">
      <Container>
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-10">
          <div
            // ref={divRef1}
            className="flex-1 text-center md:text-left space-y-4"
          >
            <TextReveal
              animateOnScroll={true}
              delay={0}
              stagger={0.1}
              duration={1}
            >
              <h1
                // ref={textRef1}
                className="text-xl font-medium text-gray-800 py-2"
              >
                Smart Meal Logging
              </h1>

              <h2 className="text-4xl font-semibold text-gray-800 py-2">
                Track Your Meals in Seconds
              </h2>
              <p className="font-normal text-gray-700 py-2">
                Just tell the app what you ate — in your own natural language —
                and our AI instantly breaks it down into calories, macros, and
                nutrition insights. No manual search, no barcode scanning, no
                overwhelm. Accurate, fast, and unbelievably simple.
              </p>
            </TextReveal>
          </div>
          <div className="flex-1 justify-center md:justify-end bg-black rounded-lg py-6 drop-shadow-[10px_10px_0_#52ea71]">
            <video
              src="/assets/input-output.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </section>
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 justify-center md:justify-end bg-black rounded-lg py-6 drop-shadow-[-10px_10px_0_#52ea71]">
            <video
              src="/assets/input-output.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          <div
            // ref={divRef2}
            className="flex-1 text-center md:text-left space-y-4"
          >
            <TextReveal
              animateOnScroll={true}
              delay={0}
              stagger={0.1}
              duration={1}
            >
              <h1 className="text-xl font-medium text-gray-800 py-2">
                AI-Powered Macro Estimation
              </h1>

              <h2 className="text-4xl font-semibold text-gray-800 py-2">
                Precision Nutrition Without the Math
              </h2>
              <p className="font-normal text-gray-700 py-2">
                Our nutrition model analyzes portion sizes, cooking methods, and
                food combinations to give highly reliable macro estimates.
                Whether your meal is homemade or from outside, you get protein,
                carbs, fats, and calorie breakdowns tailored to real-world
                eating.
              </p>
            </TextReveal>
          </div>
        </section>
      </Container>
    </section>
  );
};

interface TextRevealProp {
  children: React.ReactNode;
  animateOnScroll: boolean;
  delay: number;
  stagger: number;
  duration: number;
}

function TextReveal({
  children,
  animateOnScroll,
  delay,
  stagger,
  duration,
}: TextRevealProp) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    //get all direct children
    const elements = Array.from(containerRef.current.children);

    //split each element
    const splits = elements.map(
      (el) =>
        new SplitText(el, {
          type: "lines",
          linesClass: "split-line",
          // lineThreshold: 0,
        })
    );

    //collect all lines from splits
    const allLines = splits.flatMap((split) => split.lines);

    gsap.set(allLines, { y: 100, opacity: 0 });

    const animationProps = {
      y: 0,
      opacity: 1,
      delay,
      stagger,
      duration,
    };

    if (animateOnScroll) {
      gsap.to(allLines, {
        ...animationProps,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          // markers: true,
        },
      });
    } else {
      gsap.to(allLines, animationProps);
    }

    return () => splits.forEach((split) => split.revert()); // cleanup
  }, []);

  return (
    <div className="overflow-hidden">
      <div ref={containerRef}>{children}</div>
    </div>
  );
}

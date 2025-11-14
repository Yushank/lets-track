"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Cta = () => {
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const heading3Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const titleHeadings = [
      heading1Ref.current,
      heading2Ref.current,
      heading3Ref.current,
    ].filter(Boolean) as HTMLElement[];

    const splits: SplitText[] = [];
    const containers = titleHeadings.map((heading) => heading.parentElement);

    titleHeadings.forEach((heading: HTMLElement, index: number) => {
      const split = SplitText.create(heading, {
        type: "chars",
        charsClass: "char",
      });
      splits.push(split);

      // Set intial character positions
      split.chars.forEach((char: Element, i: number) => {
        const charInitialY = i % 2 === 0 ? -150 : 150;
        gsap.set(char, { y: charInitialY });
      });

      // Set inital container positions
      const containerX = index === 1 ? -100 : 100;
      gsap.set(containers[index], { x: `${containerX}%` });
    });

    //for each heading, animate their cplit text and their respective container
    titleHeadings.forEach((heading: HTMLElement, index: number) => {
      const container = containers[index];
      const split = splits[index];

      const outerContainer = heading.parentElement?.parentElement;

      //contianer animation
      gsap.to(container, {
        x: 0,
        scrollTrigger: {
          trigger: outerContainer,
          start: "top bottom",
          end: "top -25%",
          scrub: 1,
          // markers: true,
        },
      });

      //characters animation
      gsap.to(split.chars, {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        scrollTrigger: {
          trigger: outerContainer,
          start: "top bottom",
          end: "top -25%",
          scrub: 1,
        },
      });
    });

    return () => {
      splits.forEach((split) => split.revert());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="h-[85vh] flex items-center bg-primary overflow-hidden">
        <div className="w-full relative flex justify-center will-change-transform">
          <h1
            ref={heading1Ref}
            className="font-montserrat font-medium md:font-semibold text-4xl md:text-8xl"
          >
            No more
          </h1>
        </div>
      </div>
      <div className="h-[85vh] flex items-center bg-white overflow-hidden">
        <div className="w-full relative flex justify-center will-change-transform">
          <h1
            ref={heading2Ref}
            className="font-montserrat font-semibold text-4xl md:text-8xl"
          >
            Food not
          </h1>
        </div>
      </div>
      <div className="h-[85vh] flex items-center bg-primary overflow-hidden">
        <div className="w-full relative flex justify-center will-change-transform">
          <h1
            ref={heading3Ref}
            className="font-montserrat font-semibold text-4xl md:text-8xl"
          >
            Found moments
          </h1>
        </div>
      </div>

      <div className="flex mt-20 flex-col items-center pt-10 bg-white">
        <h1 className="text-4xl font-semibold text-gray-900">
          Ask AI and track what you ate today
        </h1>
        <div className="flex justify-center md:justify-start gap-4 pt-6">
          <button className="px-2 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-gray-50 font-medium">
            LET'S TRACK
          </button>
          <button className="px-2 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 font-medium">
            SIGN IN
          </button>
        </div>
      </div>
    </section>
  );
};

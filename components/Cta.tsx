"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useEffect } from "react";

export const Cta = () => {
  useEffect(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    document.fonts.ready.then(() => {
      const split = new SplitText(".SplitText", {
        type: "words,lines",
        linesClass: "line",
      });

      // gsap.set(split.lines, { yPercent: 100, opacity: 0 });

      // gsap.set(".Split", { opacity: 1 });

      gsap.fromTo(
        split.lines,
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          duration: 0.6,
          yPercent: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".SplitText",
            start: "top 80%",
            toggleActions: "play none none none",
            markers: true,
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".FadeText",
        {
          opacity: 0,
        },
        {
          duration: 2,
          opacity: 1,
          scrollTrigger: {
            trigger: ".FadeText",
            start: "top 80%",
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="min-h-screen text-center">
      <div className="bg-green-500 py-10 text-center">
        <h1 className="SplitText text-5xl font-semibold text-gray-50 pt-2">
          No more "food not found" moments
        </h1>
        <p className="FadeText py-4 text-gray-700">
          No matter what’s on your plate — our AI calculates it.
        </p>
      </div>

      <div className="flex justify-center mt-10">
        <div className="border border-gray-800 rounded-lg px-10 py-20 flex flex-col justify-center items-center w-full max-w-md shadow-md">
          <h1 className="text-3xl text-gray-900">Robot</h1>
          <p className="text-gray-800">Calories in your meal are 355</p>
        </div>
      </div>

      <div className="flex mt-20 flex-col items-center">
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

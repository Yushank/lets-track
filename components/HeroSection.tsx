"use client";

import Image from "next/image";
import { Container } from "./Container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useEffect, useRef } from "react";

export const HeroSection = () => {
  return (
    <Container>
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1 text-center md:text-left space-y-4">
          <h1 className="font-semibold text-gray-900 text-4xl md:text-5xl">
            The End of "Food Not Found"
          </h1>
          <p className="font-light text-gray-700 text-xl">
            Track any meal with AI—no more scrolling through endless lists.
          </p>
          <div className="flex justify-center md:justify-start gap-4 pt-6">
            <button className="px-2 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-gray-50 font-medium">
              LET'S TRACK
            </button>
            <button className="px-2 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 font-medium">
              SIGN IN
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center lg:ml-4">
          {/* <AnimatedScale /> */}
          <AnimatedBurger />
        </div>
      </section>
    </Container>
  );
};

function AnimatedBurger() {
  const burgerRef = useRef<HTMLImageElement>(null); //this will reference the objects
  const imageRef1 = useRef<HTMLImageElement>(null);
  const imageRef2 = useRef<HTMLImageElement>(null);
  const imageRef3 = useRef<HTMLImageElement>(null);
  const imageRef4 = useRef<HTMLImageElement>(null);
  const imageRef5 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      [imageRef1.current], //what to animate
      {
        y: 0, //starting point of animation
      },
      {
        scrollTrigger: {
          trigger: burgerRef.current, //what moves from veiwport that triger the animation
          start: "center center", //start animation when center of burgerRef and viewport cross
          end: "bottom top", //stops animation when bottom of burgerRef and top of viewport corsses
          markers: true, //this will show the burgerRef and viewports points that trigger the animation
          scrub: 1, //smooths the animation
        },
        y: -70, //end point of animation
        duration: 10, //time it takes, pace basicaly
      }
    );
    gsap.fromTo(
      [imageRef2.current],
      {
        y: 0,
      },
      {
        scrollTrigger: {
          trigger: burgerRef.current,
          start: "center center",
          end: "bottom top",
          markers: true,
          scrub: 1,
        },
        y: -60,
        duration: 10,
      }
    );
    gsap.fromTo(
      [imageRef3.current],
      {
        y: 0,
      },
      {
        scrollTrigger: {
          trigger: burgerRef.current,
          start: "center center",
          end: "bottom top",
          markers: true,
          scrub: 1,
        },
        y: 0,
        duration: 10,
      }
    );
    gsap.fromTo(
      [imageRef4.current],
      {
        y: 0,
      },
      {
        scrollTrigger: {
          trigger: burgerRef.current,
          start: "center center",
          end: "bottom top",
          markers: true,
          scrub: 1,
        },
        y: 45,
        duration: 10,
      }
    );

    gsap.fromTo(
      [imageRef5.current],
      {
        y: 0,
      },
      {
        scrollTrigger: {
          trigger: burgerRef.current,
          start: "center center",
          end: "bottom top",
          markers: true,
          scrub: 1,
        },
        y: 55,
        duration: 10,
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      className="w-[200px] h-[150px] lg:w-[300px] lg:h-[200px]"
      ref={burgerRef}
    >
      <div ref={imageRef1} className="flex">
        <Image
          src="/assets/burger-top.png"
          alt="scale image"
          width={100}
          height={100}
          className="w-full max-w-sm md:max-w-md"
        />
        <AnimatedLines imgRef={burgerRef} />
      </div>
      <div ref={imageRef2} className="flex">
        <Image
          src="/assets/burger-veg1.png"
          alt="scale image"
          width={100}
          height={100}
          className="w-full max-w-sm md:max-w-md"
        />
        <AnimatedLines imgRef={burgerRef} />
      </div>
      <div ref={imageRef3} className="flex">
        <Image
          src="/assets/burger-mid.png"
          alt="scale image"
          width={100}
          height={100}
          className="w-full max-w-sm md:max-w-md"
        />
        <AnimatedLines imgRef={burgerRef} />
      </div>
      <div ref={imageRef4} className="flex">
        <Image
          src="/assets/burger-veg2.png"
          alt="scale image"
          width={100}
          height={100}
          className="w-full max-w-sm md:max-w-md"
        />
        <AnimatedLines imgRef={burgerRef} />
      </div>
      <div ref={imageRef5} className="flex">
        <Image
          src="/assets/burger-base.png"
          alt="scale image"
          width={100}
          height={100}
          className="w-full max-w-sm md:max-w-md"
        />
        <AnimatedLines imgRef={burgerRef} />
      </div>
    </div>
  );
}

interface RefProps {
  imgRef: RefObject<HTMLImageElement | null>;
}

function AnimatedLines({ imgRef }: RefProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef1 = useRef(null);
  const dotRef2 = useRef(null);

  useEffect(() => {
    const svg = lineRef.current?.querySelector("svg");
    const path = svg?.querySelector("path");

    if (!path) {
      return;
    }
    const pathLength = path?.getTotalLength();

    console.log("path length:", pathLength);

    gsap.set(path!, { strokeDasharray: pathLength });

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      path!,
      {
        strokeDashoffset: pathLength,
      },
      {
        strokeDashoffset: 0,
        duration: 20,
        ease: "none",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "center center",
          end: "bottom bottom",
          scrub: 1,
          markers: true,
        },
      }
    );

    gsap.fromTo(
      dotRef1.current,
      {
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: lineRef.current,
          start: "center center",
          end: "bottom bottom",
          scrub: 1,
        },
        opacity: 1,
        duration: 10,
      }
    );

    gsap.fromTo(
      dotRef2.current,
      {
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: imgRef.current,
          start: "center center",
          end: "center center",
          scrub: 1,
        },
        opacity: 1,
        duration: 5,
      }
    );
  }, []);

  return (
    <div ref={lineRef} className="w-[5px] lg:w-[10px]">
      <svg
        width="75"
        height="7"
        viewBox="0 0 149 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 4H145" stroke="#1F1F1F" stroke-width="3" />
        <circle ref={dotRef1} cx="3.5" cy="3.5" r="3.5" fill="#1F1F1F" />
        <circle ref={dotRef2} cx="145.5" cy="3.5" r="3.5" fill="#1F1F1F" />
      </svg>
    </div>
  );
}

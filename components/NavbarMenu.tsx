"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

interface CircularNavProps {
  items?: NavItem[];
}

export const NavbarMenu: React.FC<CircularNavProps> = ({
  items = [
    { label: "Contact", href: "mailto:yushank.dev@gmail.com" },
    { label: "Socials", href: "https://x.com/YushankKashyap" },
    { label: "Github", href: "https://github.com/Yushank" },
  ],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [radius, setRadius] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; //meaning we are on the server side, as window is only available on client side

    const calculateRadius = () => {
      if (!buttonRef.current) return; //means no button is refered for us to calculate radius

      const rect = buttonRef.current.getBoundingClientRect(); //to get all the numbers of button [dist. from left, right, top, bottom, width, height]

      //calculating center position of button
      const centerX = rect.left + rect.width / 2; //distance of button from left + radius of button
      const centerY = rect.top + rect.height / 2; //dist of button from top + radius of button

      const distances = [
        Math.hypot(centerX, centerY),
        Math.hypot(window.innerWidth - centerX, centerY),
        Math.hypot(centerX, window.innerHeight - centerY),
        Math.hypot(window.innerWidth - centerX, window.innerHeight - centerY),
      ];

      return Math.max(...distances); //finding the largest distance so that we can use that to cover whole screen
    };

    if (isOpen) {
      //if button clicked to open
      const maxRadius = calculateRadius(); //get max radius
      setRadius(0); //set initial to 0

      requestAnimationFrame(() => {
        //to wait for some frame
        setRadius(maxRadius!); //set radius to max radius
        //this prevent making snappy animation of 0 to max radius, it makes smooth animation
      });
    } else {
      setRadius(0); //if not open then set radius again to 0
    }
  }, [isOpen]);

  return (
    <div className="relative flex justify-between">
      <div>
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center z-30 w-10 h-10 rounded-full border-0 cursor-pointer fixed right-5 top-5 outline-none transition-all duration-300 ease-in-out ${
            isOpen
              ? "bg-black scale-100 animate-[scale_300ms_ease]"
              : "bg-[#c6e421]"
          }`}
          aria-label="Toggle animation"
          aria-expanded={isOpen}
        >
          <Menu className={`${isOpen ? "text-gray-50" : "text-gray-900"}`} />
        </button>

        <nav
          ref={navRef}
          className={`fixed overflow-hidden z-20 top-0 left-0 w-full h-full box-border p-10 flex flex-col justify-between transition-all duration-500 ease-in-out ${
            isOpen ? "visible" : "invisible"
          }`}
          style={{
            backgroundColor: "#c6e421",
            clipPath: `circle(${radius}px at calc(100% - 50px) 47px)`, //to draw a circle of radius pixels from point 55px from left and 47px from top
          }}
          aria-hidden={!isOpen}
        >
          <ul className="list-none">
            {items.map((item, index) => (
              <li key={index} className="leading-none py-4 px-2">
                <Link
                  href={item.href}
                  className="text-7xl  md:text-9xl font-montserrat font-semibold text-gray-900 no-underline hover:opacity-70 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

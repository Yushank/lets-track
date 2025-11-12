import type { Config } from "tailwindcss";
import { jersey10 } from "./app/layout";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        jersey10: ["var(--font-jersey10)"],
        montserrat: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [],
} satisfies Config;

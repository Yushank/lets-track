/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // if using app directory
    "./pages/**/*.{js,ts,jsx,tsx}", // if using pages directory
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // if using src directory
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#000000",
        sidebar: "#171616",
        sidebarHover: "#2C2C2C",
        primary: "#52ea71",
      },
      fontFamily: {
        jersey10: ["var(--font-jersey10)"],
        montserrat: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",      // if using app directory
    "./pages/**/*.{js,ts,jsx,tsx}",    // if using pages directory
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"       // if using src directory
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}

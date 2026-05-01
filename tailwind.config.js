/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#FFF8F0", 100: "#FFF8F0", 200: "#F5E6D3" },
        maroon: { DEFAULT: "#800020", 100: "#9B0030", 200: "#6B001A", 600: "#800020", 700: "#6B001A", 800: "#550015" },
        gold: { DEFAULT: "#C9A84C", 100: "#E8C96A", 200: "#B8943A", 400: "#C9A84C", 500: "#B8943A" },
        brown: { DEFAULT: "#3E1F00", 100: "#5C2E00", 200: "#3E1F00" },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {},
  animations: {
    "fade-in": "fade-in 3s ease-in-out",
  },
  keyframes: {
    "fade-in": {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
  },
};

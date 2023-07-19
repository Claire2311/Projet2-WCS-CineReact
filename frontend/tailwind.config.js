/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#FFFCF9",
      red: "#9C0000",
    },
    fontFamily: {
      sans: ["Dosis", "sans-serif"],
    },
    extend: {
      colors: {
        b1: "#0F142B",
        b2: "#162852",
        b3: "#15547A",
        b4: "#1A77A3",
        b5: "#47B0D2",
        gold: "#FFD700",
        g1: "#A4A4A4",
        g2: "#D9D9D9",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};

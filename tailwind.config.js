/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },

      backgroundImage: {
        app: "url(/bg.png)",
      },

      colors: {
        gray: {
          100: "#E1E1E6",
          200: "#C4C4CC",
          300: "#8D8D99",
          600: "#323238",
          700: "#202024",
          800: "#121214",
          900: "#09090A",
        },
        green: {
          500: "#129E57",
        },
        yellow: {
          500: "#F7DD43",
        },
      },
    },
  },
  plugins: [],
};

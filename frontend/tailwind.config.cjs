/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Fondamento"],
      },
      colors: {
        primary: "#ffcb8d",
        primaryLight: "#D58A32",
        secondary: "#724C41",
        accent: "#CD442C",
        bgBlack: "#040203",
        bgBrown: '#29221c',
        borderBrown: "#62351f",
        borderTopBrown: "#734a32",
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-accent",
    "py-5",
    "py-2",
    "px-5",
    "px-2",
    "py-3",
    "py-4",
    "px-15",
    "px-10",
  ],
};

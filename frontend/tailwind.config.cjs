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
        bgBrown: "#29221c",
        borderBrown: "#62351f",
        borderTopBrown: "#734a32",
        gradientBrownTop: "#52201F",
        gradientBrownBottom: "#2E1510",
        grey1: "#919191",
      },
      keyframes: {
        notificationStart: {
          from: { transform: "translate(-50%, -24px)", opacity: 0 },
          to: { transform: "translate(-50%, 0px)", opacity: 1 },
        },
        notificationEnd: {
          from: { transform: "translate(-50%, 0px)", opacity: 1 },
          to: { transform: "translate(-50%, -24px)", opacity: 0 },
        },
      },
      animation: {
        notificationStart:
          "notificationStart 0.5s cubic-bezier(0.1, 0.65, 0.45, 1) forwards",
        notificationEnd:
          "notificationEnd 0.5s cubic-bezier(0.1, 0.65, 0.45, 1) forwards",
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-accent",
    "bg-borderBrown",
    "bg-secondary",
    "py-5",
    "py-2",
    "px-5",
    "px-2",
    "py-3",
    "py-4",
    "px-15",
    "px-10",
    "animate-notificationStart",
    "animate-notificationEnd",
  ],
};

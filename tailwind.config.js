/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#61C3F2",
        dark: "#2E2739",
        background: "#F6F6FA",
        muted: "#827D88",
        lightGrey: "#DBDBDF",
        teal: "#15D2BC",
        pink: "#E26CA5",
        purple: "#564CA3",
        yellow: "#CD9D0F",
      },
      fontFamily: {
        poppins: ["Poppins_400Regular", "sans-serif"],
        "poppins-medium": ["Poppins_500Medium", "sans-serif"],
        "poppins-semibold": ["Poppins_600SemiBold", "sans-serif"],
        "poppins-bold": ["Poppins_700Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};

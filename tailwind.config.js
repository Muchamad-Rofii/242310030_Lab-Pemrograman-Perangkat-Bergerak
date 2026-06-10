/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F97316",
          light: "#FDBA74",
          dark: "#C2410C",
        },
        secondary: {
          DEFAULT: "#1E293B",
          light: "#334155",
          dark: "#0F172A",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F8FAFC",
          card: "#F1F5F9",
        },
        accent: {
          green: "#22C55E",
          red: "#EF4444",
          yellow: "#EAB308",
        },
        canteen: {
          bg: "#FFF7ED",
          border: "#FED7AA",
          text: "#7C2D12",
        },
      },
    },
  },
  plugins: [],
};

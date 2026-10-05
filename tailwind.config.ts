import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ethiopia: {
          blue: "#0284c7",
          deepBlue: "#0f2b5c",
          gold: "#f59e0b",
          green: "#10b981",
          red: "#ef4444",
        },
      },
      animation: {
        "float-slow": "floatSlow 7s ease-in-out infinite",
        "float-slower": "floatSlower 11s ease-in-out infinite",
        "float-gentle": "floatGentle 5s ease-in-out infinite",
        "drift": "drift 14s ease-in-out infinite",
        "pulse-slow": "pulseGlow 6s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(1deg)" },
        },
        floatSlower: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(-1.5deg)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        drift: {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(16px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

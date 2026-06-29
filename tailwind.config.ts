import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        skalvi: {
          purple: "#652d8e",
          deep: "#2d2b5e",
          ink: "#24213a",
          orange: "#f58220",
          gold: "#f7be5c",
          mist: "#f6f3f8"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-lora)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(45, 43, 94, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;

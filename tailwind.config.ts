import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          50: "#FFFDF0",
          100: "#FFF9C4",
          200: "#FFF176",
          300: "#FFE082",
          400: "#F2C94C",
          500: "#D4AF37", // Primary Antique Gold
          600: "#B89127",
          700: "#996515",
          800: "#70480C",
          900: "#4A2F06",
        },
        obsidian: {
          950: "#050507",
          900: "#0A0A0E",
          850: "#0F0F14",
          800: "#15151B",
          700: "#1F1F27",
          600: "#2B2B36",
        },
      },
      fontFamily: {
        cinzel: ["Cinzel", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        archivo: ["'Archivo Black'", "Impact", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Space Mono'", "monospace"],
      },
      boxShadow: {
        "gold-sm": "0 0 15px -3px rgba(212, 175, 55, 0.2)",
        "gold-md": "0 0 25px -5px rgba(212, 175, 55, 0.35)",
        "gold-lg": "0 0 45px -8px rgba(212, 175, 55, 0.45)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

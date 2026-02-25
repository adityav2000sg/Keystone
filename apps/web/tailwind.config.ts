import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        keystone: {
          bg: "var(--keystone-bg)",
          "bg-subtle": "var(--keystone-bg-subtle)",
          accent: "var(--keystone-accent)",
          "accent-muted": "var(--keystone-accent-muted)",
          surface: "var(--keystone-surface)",
          "surface-hover": "var(--keystone-surface-hover)",
          border: "var(--keystone-border)",
          "border-strong": "var(--keystone-border-strong)",
          ink: "var(--keystone-ink)",
          "ink-muted": "var(--keystone-ink-muted)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "tile-in": "tileIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "seal-pulse": "sealPulse 2s ease-in-out infinite",
      },
      keyframes: {
        tileIn: {
          "0%": { opacity: "0", transform: "scale(0.92) translateY(8px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        sealPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;

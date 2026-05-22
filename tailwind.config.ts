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
        terra: {
          50:  "#fdf6f0", 100: "#fae8d8", 200: "#f3ccaa",
          300: "#eaa876", 400: "#e08040", 500: "#c96830",
          600: "#a85228", 700: "#874020", 800: "#6b321a", 900: "#572818",
        },
        warm: {
          50:  "#FAFAF8", 100: "#F5F4F0", 200: "#EBEAE4",
          300: "#D8D7CE", 400: "#B8B7AC", 500: "#908F82",
          600: "#6E6D62", 700: "#4F4E45", 800: "#33332C", 900: "#1A1A15",
        },
      },
      fontFamily: {
        serif: ['"Libre Baskerville"', "Georgia", "serif"],
        sans:  ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono:  ['"IBM Plex Mono"', "monospace"],
      },
      animation: {
        "drift":      "drift 30s ease-in-out infinite alternate",
        "fade-up":    "fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
        "float":      "float 6s ease-in-out infinite",
        "spin-slow":  "spinSlow 20s linear infinite",
        "glow":       "pulseGlow 3s ease-in-out infinite",
        "shimmer":    "shimmer 2.5s infinite",
      },
      keyframes: {
        drift:     { "0%": { transform:"scale(1) translate(0,0)" }, "100%": { transform:"scale(1.06) translate(-1%,-1%)" } },
        fadeUp:    { "0%": { opacity:"0", transform:"translateY(32px)" }, "100%": { opacity:"1", transform:"translateY(0)" } },
        float:     { "0%,100%": { transform:"translateY(0px)" }, "50%": { transform:"translateY(-12px)" } },
        spinSlow:  { from: { transform:"rotate(0deg)" }, to: { transform:"rotate(360deg)" } },
        pulseGlow: { "0%,100%": { boxShadow:"0 0 0 0 rgba(201,104,48,0)" }, "50%": { boxShadow:"0 0 30px 8px rgba(201,104,48,0.15)" } },
        shimmer:   { "0%": { backgroundPosition:"-200% 0" }, "100%": { backgroundPosition:"200% 0" } },
      },
      boxShadow: {
        "3d":      "0 20px 60px -10px rgba(0,0,0,0.3), 0 8px 20px -5px rgba(0,0,0,0.15)",
        "3d-warm": "0 20px 60px -10px rgba(201,104,48,0.2), 0 8px 20px -5px rgba(201,104,48,0.1)",
        "card":    "0 4px 24px -4px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        "card-hover": "0 16px 48px -8px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.06)",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [],
};

export default config;

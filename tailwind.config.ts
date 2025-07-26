import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      dropShadow: {
        custom: "8px 6px 10px #eceabb",
        glow: "0 0 8px rgba(255, 255, 0, 0.75)",
      },
    },
  },
  plugins: [],
} satisfies Config;

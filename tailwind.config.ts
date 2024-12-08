import { Config } from "tailwindcss";

export default {
  content: [
    "./src/Pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#4CAF50",
        secondary: "#FFC107",
        danger: "#F44336",
      },
      spacing: {
        "128": "32rem",
      },
    },
  },
  plugins: [],
} satisfies Config;

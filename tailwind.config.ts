import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        layout: {}, // light theme layout tokens
        colors: {
          primary: "#0070f3",
          secondary: "#1c1c1e",
          background: "#ffffff",
          foreground: "#333333",
          divider: "#e2e8f0",
          hover: "#e5e7eb",
          accent: "#f5a623",
          muted: "#f6f6f6",
          content1: "#f4f4f4",
          content2: "#D1D5DB"
        } // light theme colors
      },
      dark: {
        layout: {}, // dark theme layout tokens
        colors: {
          primary: "#79ffe1",
          secondary: "#fafafa",
          background: "#111111",
          foreground: "#e1e1e1",
          divider: "#333333",
          hover: "#333333",
          accent: "#f5a623",
          muted: "#1c1c1c",
          content1: "#282828",
          content2: "#282828"
        } // dark theme colors
      },
    }
  })],
};
export default config;

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        xala: {
          primary: "#0F172A",
          secondary: "#1E293B",
          accent: "#38BDF8",
          text: "#E2E8F0",
        },
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "fade-in": "fade-in 1s ease-out",
        "float-1": "float1 20s ease infinite",
        "float-2": "float2 25s ease infinite",
        "float-3": "float3 30s ease infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        float1: {
          "0%, 100%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "25%": {
            transform: "translate(20px, -20px) rotate(5deg)",
          },
          "50%": {
            transform: "translate(-10px, 20px) rotate(-5deg)",
          },
          "75%": {
            transform: "translate(-20px, -10px) rotate(3deg)",
          },
        },
        float2: {
          "0%, 100%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "33%": {
            transform: "translate(-15px, 15px) rotate(-3deg)",
          },
          "66%": {
            transform: "translate(15px, -15px) rotate(3deg)",
          },
        },
        float3: {
          "0%, 100%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "50%": {
            transform: "translate(10px, -20px) rotate(5deg)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
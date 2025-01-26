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
      fontFamily: {
        sans: ["Chakra Petch", "sans-serif"],
        chakra: ["Chakra Petch", "sans-serif"],
      },
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
        "fade-in": "fade-in 1.5s ease-in-out",
        "float-1": "float1 30s ease-in-out infinite",
        "float-2": "float2 35s ease-in-out infinite",
        "float-3": "float3 40s ease-in-out infinite",
        "twinkle-1": "twinkle 4s ease-in-out infinite",
        "twinkle-2": "twinkle 6s ease-in-out infinite",
        "twinkle-3": "twinkle 8s ease-in-out infinite",
        "galaxy-spin": "galaxy-spin 100s linear infinite",
        "bounce": "bounce 1s infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
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
        twinkle: {
          "0%, 100%": {
            opacity: "0.2",
            transform: "scale(0.8)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.2)",
          },
        },
        "galaxy-spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
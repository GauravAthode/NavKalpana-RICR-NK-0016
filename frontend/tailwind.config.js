/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // high‑visibility orange + charcoal/dark-gray theme
          primary: "#0d0d0d",      // charcoal (main background)
          secondary: "#1a1a1a",    // dark gray (cards/panels)
          accent: "#ff7a00",       // high‑visibility orange
          "accent-hover": "#ffa500", // brighter orange for hovers
          text: "#f1f1f1",         // light gray/white for text
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(99,102,241,0.25)",
      },
      animation: {
        fade: "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
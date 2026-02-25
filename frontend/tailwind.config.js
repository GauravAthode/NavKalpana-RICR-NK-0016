/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // custom theme per user request
          primary: "#222831",   // very dark navy
          secondary: "#393E46", // dark charcoal
          accent: "#948979",    // muted taupe
          light: "#DFD0B8",     // soft beige for text/highlight
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
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        pb: {
          lavender: "#e6ddf5",
          purple: "#6b1fad",
          grape: "#401268",
          lilac: "#cea8f0",
          ink: "#12081e",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        card: "0 8px 30px rgba(64,18,104,0.12)",
      },
    },
  },
  plugins: [],
};

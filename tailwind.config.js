/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./landing-page.html",
    "./**/*.html",
    "./**/*.{js,ts,jsx,tsx}", // optional, helpful if you add JS files later
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Poppins", "system-ui", "sans-serif"],
        heading: ["Saira Condensed", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

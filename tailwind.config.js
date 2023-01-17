/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "girl-field": "url('/homepage/girl-field.jpeg')",
        "blue-girl" : "url('/homepage/blue-girl.jpg')"
      }
    },
    gridTemplateColumns: {
        "shoping-list" : "repeat(auto-fill, 300px)"
    },
  },
  plugins: [],
};

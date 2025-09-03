/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "turquoise-radial": "radial-gradient(circle at top left, #1abc9c, #2c3e50)",
      },
    },
  },
  plugins: [],
};

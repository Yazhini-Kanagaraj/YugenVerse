/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 🔥 Enable Dark Mode
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "turquoise-radial":
          "radial-gradient(circle at top left, #1abc9c, #2c3e50)",
      },
      colors: {
        primary: "#1abc9c", // turquoise main color
        darkBg: "#0d1117", // dark theme background
        darkCard: "#161b22", // dark card color
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [],
};

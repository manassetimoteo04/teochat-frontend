export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Lightmode colors
        "main-color": "#fb923c",
        "main-bg-color": "#F1F1F1",
        "main-bg-color-2": "#fff",
        "main-text-color": "#010101",
        "secondary-text-color": "#6b7280",
        "main-border-color": "#DCDCDC",

        // Darkmode colors
        "main-bg-color-dark": "#0e0e0e",
        "main-bg-color-dark-2": "#181818",
        "main-text-color-dark": "#f9fafb",
        "secondary-text-color-dark": "#9ca3af",
        "main-border-color-dark": "#1f2937",
      },
      keyframes: {
        pulseGrow: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.7" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        pulseGrow: "pulseGrow 1s ease-in-out infinite",
      },
    },
    plugins: [],
  },
};

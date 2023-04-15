const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--aw-color-primary)",
        secondary: "var(--aw-color-secondary)",
        accent: "var(--aw-color-accent)",
        custon_dark: "#2e3545",
      },
      fontFamily: {
        sans: ["var(--aw-font-sans)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--aw-font-serif)", ...defaultTheme.fontFamily.serif],
        heading: ["var(--aw-font-heading)", ...defaultTheme.fontFamily.sans],
      },
      backgroundColor: {
        white: "#2e3545",
        dark: "#2e3545", // Dark Modeの背景色を変更
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};

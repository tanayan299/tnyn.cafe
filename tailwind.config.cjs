/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  extend: {
    fontFamily: {
      "ibm-plex-sans": ['"IBM Plex Sans"', "sans-serif"],
    },
  },
  plugins: [],
  darkMode: "class",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateAreas: {
        layout_sm: ["navbar navbar", "main main", "footer footer"],
        layout_md: ["navbar navbar", "sidebar main", "sidebar footer"],
      },
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};

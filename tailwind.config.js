/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./catalog.html",
    "./property.html",
    "./*.js",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'gave-primary': '#00375D', // Main brand blue
        'gave-secondary': '#3E7751', // Accent brand green
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

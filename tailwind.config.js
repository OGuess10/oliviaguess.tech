/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito"', 'sans-serif'],
      },
      colors: {
        'midnight': '#030432',
        'gold': '#F2A249',
        'navy': '#0E285C',
        'cream': '#FDF5E6'
      }
    },
  },
  plugins: [],
}



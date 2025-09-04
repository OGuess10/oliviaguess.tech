/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Noto Sans"', 'sans-serif'],
        'serif': ['"Noto Serif"', 'serif'],
      },
      colors: {
        'midnight': '#030432',
        'lightgold': '#f7d5b0',
        'gold': '#F2A249',
        'darkgold': '#9a6222ff',
        'navy': '#0E285C',
        'cream': '#FDF5E6'
      },
      animation: {
        'pulse-long': 'pulse 2s 0.9s ease-in-out infinite',
        'pulse-med': 'pulse 2s 0.6s ease-in-out infinite',
        'pulse-short': 'pulse 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}



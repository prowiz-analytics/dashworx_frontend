/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primaryColor: process.env.REACT_APP_PRIMARY_COLOR,
      hoverColor: "#274156",
    },
    extend: {
      screens: {
        'sm': '960px',
        'md': '1240px',
        'lg': '1400px',
        'xl': '1700px',
        '2xl':'2000px',
        // Custom max-height breakpoints
        'max-h-600':  { 'raw': '(max-height: 600px)' },
        'max-h-800':  { 'raw': '(max-height: 800px)' },
        'max-h-900':  { 'raw': '(max-height: 900px)' },
        'min-h-1000': {'raw':'(min-height: 1000px)'},
        'min-h-1400': {'raw':'(min-height: 1400px)'}
      },
    },
  },
  plugins: [],
}

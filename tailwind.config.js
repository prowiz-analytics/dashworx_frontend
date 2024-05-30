/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      primaryColor:process.env.REACT_APP_PRIMARY_COLOR,
      hoverColor:"#274156",
    },
    extend: {},
  },
  plugins: [],
}


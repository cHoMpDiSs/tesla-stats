/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Default sans-serif font
        openSans: ['Open Sans', 'sans-serif'], // Open Sans
        poppins: ['Poppins', 'sans-serif'], // Poppins
        montserrat: ['Montserrat', 'sans-serif'], // Montserrat
        futura: ['Quicksand', 'sans-serif'], // Futura alternative
      },
    },
  },
  plugins: [],
};



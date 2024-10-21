/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // This should cover all your source files
  ],
  darkMode: 'class', 
  theme: {
      extend: {},
  },
  variants: {
      extend: {
          textOpacity: ['dark']
      }
  },
  plugins: [],
}
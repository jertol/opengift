/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fefcf9',
          100: '#fdf7f0',
          200: '#f9ede1',
          300: '#f2dfcc',
          400: '#e8ccaa',
          500: '#dab588',
          600: '#c49c6b',
          700: '#a67c52',
          800: '#8b6444',
          900: '#6d4d37',
        },
        cream: {
          50: '#fefcf9',
          100: '#fdf7f0',
          200: '#f9ede1',
          300: '#f2dfcc',
          400: '#e8ccaa',
          500: '#dab588',
        },
        beige: {
          50: '#fefcf9',
          100: '#fcf8f3',
          200: '#f7f0e8',
          300: '#f0e4d7',
          400: '#e6d4c1',
          500: '#d9c0a3',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
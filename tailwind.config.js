/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1c3976',
        secondary: '#f8f8f8',
        inter: '#9e9ea7'
      }
    },
    fontWeight: {
      bold: 700
    }
  },
  plugins: []
}

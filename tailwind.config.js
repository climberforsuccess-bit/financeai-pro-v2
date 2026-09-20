/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5DD9C1',
        accent: '#FF8C42',
        dark: '#0F172A',
      },
    },
  },
  plugins: [],
}

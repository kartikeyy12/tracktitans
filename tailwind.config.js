/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C8960C',
        'gold-dim': 'rgba(200,150,12,0.15)',
        dark: '#111111',
        darker: '#0a0a0a',
        card: '#1c1c1c',
      },
      fontFamily: {
        display: ['Syncopate', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E91E63',
        'primary-dark': '#C2185B',
        'primary-light': '#F8BBD0',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
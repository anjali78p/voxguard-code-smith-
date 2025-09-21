/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#2563EB',
        'secondary-green': '#10B981',
        'warning-yellow': '#F59E0B',
        'danger-red': '#EF4444',
        'dark-bg': '#111827',
        'light-bg': '#F9FAFB',
        'card-bg': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

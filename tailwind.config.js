/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-900': '#121212',
        'gray-800': '#1E1E1E',
        'gray-700': '#2A2A2A',
        'gray-600': '#363636',
        'primary': '#00A8FF',
        'secondary': '#00C7B1',
        'danger': '#FF4757',
        'warning': '#FFC312',
        'info': '#48DBFB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'pulse-bg': {
          '0%, 100%': { backgroundColor: 'rgba(0, 168, 255, 0.1)' },
          '50%': { backgroundColor: 'rgba(0, 168, 255, 0.2)' },
        },
        'pulse-border': {
          '0%, 100%': { borderColor: 'rgba(255, 71, 87, 0.5)' },
          '50%': { borderColor: 'rgba(255, 71, 87, 1)' },
        },
      },
      animation: {
        'pulse-border': 'pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    }
  },
  plugins: [],
};

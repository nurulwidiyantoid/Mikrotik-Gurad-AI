
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
        'gray-900': '#0D1117', // Darker, more modern background
        'gray-800': '#161B22', // Card backgrounds
        'gray-700': '#21262D', // Borders, dividers
        'gray-600': '#30363D', // Hover states
        'primary': '#00A8FF',   // Vibrant Blue
        'secondary': '#00C7B1', // Teal/Green
        'danger': '#FF4757',    // Red
        'warning': '#FFC312',   // Yellow
        'info': '#48DBFB',      // Light Blue
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
        'pulse-slow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(0, 199, 177, 0.7)' },
          '70%': { opacity: '0.7', boxShadow: '0 0 0 6px rgba(0, 199, 177, 0)' },
          '100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(0, 199, 177, 0)' },
        },
        shine: {
          'from': { transform: 'rotate(0deg) translateX(-100%) translateY(-100%)' },
          'to': { transform: 'rotate(10deg) translateX(100%) translateY(100%)' }
        }
      },
      animation: {
        'pulse-border': 'pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse-slow 2s infinite',
        'shine': 'shine 3s linear infinite'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [],
};
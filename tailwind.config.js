/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
          animation: {
    'in': 'in 0.3s ease-in-out',
  },
  keyframes: {
    in: {
      '0%': { opacity: 0, transform: 'translateY(-10px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
  },
      colors: {
        primary: {
          DEFAULT: '#92400e', // amber-800
          light: '#b45309',  // amber-700
          50: '#fffbeb',     // amber-50
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#713f12', // amber-900
          light: '#854d0e',   // amber-800
          foreground: '#ffffff',
        }
      },
    },
  },
  plugins: [],
};
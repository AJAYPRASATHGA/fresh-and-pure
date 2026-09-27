/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        gold: {
          50: '#FFF9E6',
          100: '#FFF0BF',
          200: '#FFE494',
          300: '#FFD666',
          400: '#FFC832',
          500: '#D4A017',
          600: '#B8860B',
          700: '#96700A',
          800: '#6B4F08',
          900: '#3D2D05',
        },
        forest: {
          50: '#F0FFF4',
          100: '#C6F6D5',
          200: '#9AE6B4',
          300: '#68D391',
          400: '#48BB78',
          500: '#2F855A',
          600: '#276749',
          700: '#1C4532',
        },
        cream: {
          50: '#FFFDF7',
          100: '#FFF8E7',
          200: '#FFF1D0',
          300: '#FFE8B5',
        },
        primary: {
          DEFAULT: '#6B4F08',
          light: '#96700A',
          dark: '#3D2D05',
          50: '#FFF9E6',
          foreground: '#FFFDF7',
        },
        secondary: {
          DEFAULT: '#2F855A',
          light: '#48BB78',
          dark: '#1C4532',
          foreground: '#ffffff',
        }
      },
      animation: {
        'in': 'in 0.3s ease-in-out',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
      },
      keyframes: {
        in: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(212, 160, 23, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(212, 160, 23, 0.4)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)', opacity: 1 },
          '50%': { transform: 'translateY(8px)', opacity: 0.5 },
        },
      },
      boxShadow: {
        'gold': '0 0 15px rgba(212, 160, 23, 0.15), 0 0 45px rgba(212, 160, 23, 0.08)',
        'gold-strong': '0 0 20px rgba(212, 160, 23, 0.25), 0 0 60px rgba(212, 160, 23, 0.12)',
        'premium': '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(212, 160, 23, 0.06)',
        'premium-hover': '0 4px 12px rgba(0, 0, 0, 0.06), 0 8px 32px rgba(212, 160, 23, 0.12)',
      },
    },
  },
  plugins: [],
};
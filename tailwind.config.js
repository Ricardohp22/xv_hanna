/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lilac: {
          50: '#f5f4ff',
          100: '#ebe9fe',
          200: '#d9d6fd',
          300: '#bdb8fb',
          400: '#9a92f7',
          500: '#736BFA',
          600: '#5b4de8',
          700: '#4d3fd4',
          800: '#4035ab',
          900: '#362f87',
        },
        blush: '#ffd6e8',
        gold: '#e8c76b',
      },
      fontFamily: {
        display: ['"Great Vibes"', 'cursive'],
        script: ['"Parisienne"', 'cursive'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        /** Serif clásica: títulos elegantes y muy legibles */
        elegant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        paper: '0 18px 50px rgba(55, 48, 120, 0.18)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        flutter: 'flutter 2.4s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        flutter: {
          '0%, 100%': { transform: 'rotate(-6deg) scale(1)' },
          '50%': { transform: 'rotate(8deg) scale(1.03)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

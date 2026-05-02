/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          bg:      '#050505',
          indigo:  '#4f46e5',
          violet:  '#7c3aed',
          amber:   '#f59e0b',
          pink:    '#db2777',
        },
        primary: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'system-ui', 'sans-serif'],
        body:    ['Satoshi', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs:  '2px',
        '4xl': '80px',
      },
      animation: {
        'gradient-flow': 'gradient-flow 15s ease infinite',
        'reveal':        'reveal 0.8s cubic-bezier(0.4,0,0.2,1) forwards',
      },
      keyframes: {
        'gradient-flow': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        reveal: {
          from: { opacity: '0', transform: 'scale(0.95) translateY(16px)', filter: 'blur(40px)' },
          to:   { opacity: '1', transform: 'scale(1) translateY(0)', filter: 'blur(0)' },
        },
      },
    },
  },
  plugins: [],
}

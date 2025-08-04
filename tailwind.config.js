/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'chat-',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7f7',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#FF3988',
          600: '#e11d48',
          700: '#be185d',
          800: '#9f1239',
          900: '#881337',
        },
        chat: {
          bg: '#fafafa',
          'user-bg': '#FF3988',
          'bot-bg': '#f8f9fa',
          border: '#e5e7eb',
          'hover': '#ff4d95',
          'light': '#fff5f8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      zIndex: {
        'chat': '9999',
        'chat-overlay': '10000',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}
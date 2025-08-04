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
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        chat: {
          bg: '#f8fafc',
          'user-bg': '#3b82f6',
          'bot-bg': '#f1f5f9',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      zIndex: {
        'chat': '9999',
        'chat-overlay': '10000',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable base styles to avoid conflicts with host site
  }
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#080D18',
          secondary: '#0D1524',
          elevated: '#111D30',
          surface: '#152238',
        },
        glass: {
          panel: 'rgba(255, 255, 255, 0.05)',
          hover: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.12)',
          'border-active': 'rgba(56, 221, 248, 0.4)',
        },
        primary: {
          DEFAULT: '#38DDF8', // Electric cyan
          hover: '#29c0da',
          glow: 'rgba(56, 221, 248, 0.25)',
        },
        violet: {
          accent: '#8B7CFF',
          glow: 'rgba(139, 124, 255, 0.25)',
        },
        blue: {
          accent: '#5B8CFF',
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#A7B4C8',
          muted: '#718096',
        },
        status: {
          critical: '#FF5C69',
          high: '#FFAA55',
          medium: '#F4D35E',
          low: '#54D6A0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'cyan-glow': '0 0 20px -3px rgba(56, 221, 248, 0.3)',
        'violet-glow': '0 0 20px -3px rgba(139, 124, 255, 0.3)',
        'critical-glow': '0 0 20px -3px rgba(255, 92, 105, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

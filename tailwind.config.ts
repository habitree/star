import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        zodiac: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          accent: '#f59e0b',
          dark: '#1e1b4b',
          light: '#f5f3ff',
        },
        element: {
          fire: '#ef4444',
          earth: '#84cc16',
          air: '#06b6d4',
          water: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config

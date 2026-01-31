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
          'fire-dark': '#D32F2F',
          'fire-light': '#FF6F00',
          earth: '#84cc16',
          'earth-dark': '#8B4513',
          'earth-light': '#2D5016',
          air: '#06b6d4',
          'air-dark': '#FFD700',
          'air-light': '#06B6D4',
          water: '#3b82f6',
          'water-dark': '#003DA5',
          'water-light': '#008B8B',
        },
        planet: {
          sun: '#F97316',
          moon: '#8B5CF6',
          mercury: '#94a3b8',
          venus: '#EC4899',
          mars: '#DC2626',
          jupiter: '#8B5CF6',
          saturn: '#78350f',
          uranus: '#0d9488',
          neptune: '#1e40af',
          pluto: '#4c1d95',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-fire': 'linear-gradient(135deg, #D32F2F 0%, #FF6F00 100%)',
        'gradient-earth': 'linear-gradient(135deg, #8B4513 0%, #2D5016 100%)',
        'gradient-air': 'linear-gradient(135deg, #FFD700 0%, #06B6D4 100%)',
        'gradient-water': 'linear-gradient(135deg, #003DA5 0%, #008B8B 100%)',
        'gradient-cosmic': 'linear-gradient(180deg, #0f0a1e 0%, #1e1b4b 50%, #312e81 100%)',
      },
      dropShadow: {
        'glow-fire': '0 0 12px rgba(255, 111, 0, 0.4)',
        'glow-earth': '0 0 12px rgba(45, 80, 22, 0.4)',
        'glow-air': '0 0 12px rgba(6, 182, 212, 0.4)',
        'glow-water': '0 0 12px rgba(0, 61, 165, 0.4)',
      },
    },
  },
  plugins: [],
}

export default config

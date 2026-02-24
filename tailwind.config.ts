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
          primary: '#8b5cf6', // brighter neon purple
          secondary: '#d946ef', // mystical fuchsia
          accent: '#fbbf24', // starlight gold
          dark: '#030014', // deep space black
          light: '#fdf4ff', // very subtle purple tint for text
        },
        element: {
          fire: '#ef4444',
          'fire-dark': '#991b1b',
          'fire-light': '#fca5a5',
          earth: '#10b981',
          'earth-dark': '#065f46',
          'earth-light': '#6ee7b7',
          air: '#0ea5e9',
          'air-dark': '#075985',
          'air-light': '#7dd3fc',
          water: '#3b82f6',
          'water-dark': '#1e3a8a',
          'water-light': '#93c5fd',
        },
        planet: {
          sun: '#fbbf24',
          moon: '#e2e8f0',
          mercury: '#94a3b8',
          venus: '#f472b6',
          mars: '#ef4444',
          jupiter: '#c084fc',
          saturn: '#d97706',
          uranus: '#2dd4bf',
          neptune: '#3b82f6',
          pluto: '#6366f1',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-fire': 'linear-gradient(135deg, #ef4444 0%, #fca5a5 100%)',
        'gradient-earth': 'linear-gradient(135deg, #10b981 0%, #6ee7b7 100%)',
        'gradient-air': 'linear-gradient(135deg, #0ea5e9 0%, #7dd3fc 100%)',
        'gradient-water': 'linear-gradient(135deg, #3b82f6 0%, #93c5fd 100%)',
        'gradient-cosmic': 'radial-gradient(ellipse at top, #1b0f36 0%, #030014 100%)',
        'glass-overlay': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
      },
      dropShadow: {
        'glow-primary': '0 0 15px rgba(139, 92, 246, 0.5)',
        'glow-fire': '0 0 12px rgba(239, 68, 68, 0.4)',
        'glow-earth': '0 0 12px rgba(45, 80, 22, 0.4)',
        'glow-air': '0 0 12px rgba(6, 182, 212, 0.4)',
        'glow-water': '0 0 12px rgba(0, 61, 165, 0.4)',
      },
    },
  },
  plugins: [],
}

export default config

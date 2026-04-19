import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'brand-black': '#0c0b0a',
        'brand-white': '#ffffff',
        'brand-off': '#f6f4f1',
        'brand-off-d': '#eeebe6',
        'brand-cream': '#faf8f5',
        'brand-warm': '#e8e2d9',
        'brand-muted': '#8c8882',
        'brand-muted-l': '#b5b0a8',
        'brand-rule': 'rgba(12,11,10,0.08)',
        'brand-rule-d': 'rgba(12,11,10,0.14)',
        'status-live':  '#16a34a',
        'status-draft': '#ca8a04',
        'status-sold':  '#8c8882',
        'status-arch':  '#dc2626',
      },
      fontFamily: {
        sans: ['"Century Gothic"', '"Josefin Sans"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'widest-2': '0.25em',
        'widest-3': '0.3em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'draw-line': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'draw-line': 'draw-line 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}

export default config

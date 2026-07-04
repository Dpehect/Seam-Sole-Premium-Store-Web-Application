import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      colors: {
        ink: '#12100E',
        cream: '#FFF7E8',
        paper: '#FBF0D4',
        punch: '#FF4E5B',
        lime: '#C9FF3C',
        cobalt: '#275DFF',
        mocha: '#4A2E22',
        clay: '#C76B3D',
        fog: '#EAE6DC'
      },
      boxShadow: {
        soft: '0 24px 80px rgba(18,16,14,.16)',
        card: '0 16px 60px rgba(18,16,14,.11)'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.6rem'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        shine: {
          '0%': { transform: 'translateX(-120%) skewX(-12deg)' },
          '100%': { transform: 'translateX(220%) skewX(-12deg)' }
        }
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        float: 'float 5s ease-in-out infinite',
        shine: 'shine 1.25s ease-in-out'
      }
    }
  },
  plugins: []
};

export default config;

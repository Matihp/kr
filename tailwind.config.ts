import type { Config } from "tailwindcss"
const animation = require('@midudev/tailwind-animations');
const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        
      },
    },
    extend: {
      screens: {
        'mxsm': { 'max': '639px' },
        'mxmd': { 'max': '767px' },
        'mxlg': { 'max': '1023px' },
        'mxxl': { 'max': '1279px' },
        'mx2xl': { 'max': '1535px' },
      },
      colors: {
        border: "hsl(var(--border))",
        prBg:'#F5F7FB',
        prBlue:'#218DFA',
        prPink:'#E9C0E9',
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'slide-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'text-gradient':{
          to:{backgroundPosition:'200% center'}
        },
        'background-shine': {
          from: {
          backgroundPosition: '0 0'
          },
          to: {
          backgroundPosition: '-200% 0'
          },
        }
        
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'slide-left-infinite': 'slide-left 25s linear infinite',
        "text-gradient": "text-gradient 5s linear infinite",
        'background-shine': 'background-shine 3s linear infinite'
      },
    },
  },
  plugins: [require("tailwindcss-animate"),animation],
} satisfies Config

export default config
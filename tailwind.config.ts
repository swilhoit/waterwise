import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom font families
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      // Refined color palette - deep teal with warm terracotta accent
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Primary: Deep, sophisticated teal
        ocean: {
          50: '#f0fafa',
          100: '#d4f1f1',
          200: '#aae4e4',
          300: '#72d0d0',
          400: '#3fb5b5',
          500: '#1f9696', // primary
          600: '#167878',
          700: '#145f5f',
          800: '#154c4c',
          900: '#163f3f',
          950: '#062525',
        },
        // Accent: Warm terracotta/coral
        terra: {
          50: '#fef5f2',
          100: '#fee9e2',
          200: '#fed7ca',
          300: '#fcbba5',
          400: '#f89470',
          500: '#ef6c43', // accent
          600: '#dc5228',
          700: '#b8411f',
          800: '#98391e',
          900: '#7e331f',
          950: '#44170b',
        },
        // Neutral: Warm slate
        sand: {
          50: '#faf9f7',
          100: '#f3f1ed',
          200: '#e7e3db',
          300: '#d6cfc2',
          400: '#c1b6a3',
          500: '#a99b83',
          600: '#9a8a71',
          700: '#80725f',
          800: '#6a5e50',
          900: '#574e43',
          950: '#2e2922',
        },
      },
      // Enhanced spacing for bolder layouts
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      // Typography scale
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
        'display-sm': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-xl': ['4.5rem', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
      },
      keyframes: {
        "slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-to-right": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "flow": {
          "0%": { left: "0%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { left: "100%", opacity: "0" },
        },
        "flow-down": {
          "0%": { top: "0%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "ripple": {
          "0%": { transform: "scale(1)", opacity: "0.2" },
          "100%": { transform: "scale(1.3)", opacity: "0" },
        },
        // New sophisticated animations
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-up": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "100%" },
          "100%": { strokeDashoffset: "0%" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "water-ripple": {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      animation: {
        "slide-in-from-right": "slide-in-from-right 0.3s ease-in-out",
        "slide-out-to-right": "slide-out-to-right 0.3s ease-in-out",
        "marquee": "marquee 30s linear infinite",
        "flow": "flow 4s ease-in-out infinite",
        "flow-down": "flow-down 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "ripple": "ripple 1.5s ease-out infinite",
        // New animations
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-up-delay-1": "fade-up 0.6s ease-out 0.1s forwards",
        "fade-up-delay-2": "fade-up 0.6s ease-out 0.2s forwards",
        "fade-up-delay-3": "fade-up 0.6s ease-out 0.3s forwards",
        "fade-up-delay-4": "fade-up 0.6s ease-out 0.4s forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-up": "scale-up 0.5s ease-out forwards",
        "slide-up": "slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "water-ripple": "water-ripple 2s ease-out infinite",
      },
      // Box shadows - minimal/none
      boxShadow: {
        'ocean': 'none',
        'ocean-lg': 'none',
        'terra': 'none',
        'soft': 'none',
        'soft-lg': 'none',
        'inner-soft': 'none',
      },
      // Border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      // Background patterns (as gradients)
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'grid-pattern': "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
        'dots-pattern': "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
        'water-lines': "repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(31, 150, 150, 0.03) 50px, rgba(31, 150, 150, 0.03) 51px)",
      },
      backgroundSize: {
        'grid': '24px 24px',
        'dots': '16px 16px',
      },
    },
  },
  plugins: [animate],
};
export default config;

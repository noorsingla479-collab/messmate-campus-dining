/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#F0F7FF',
          100: '#E0EFFE',
          200: '#BAE0FD',
          300: '#7CC7FB',
          400: '#36A8F5',
          500: '#0C8CE7',
          600: '#006FC4',
          700: '#0157A0',
          800: '#064C84',
          900: '#0B426D',
        },
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        ink: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 3px -1px rgba(2, 32, 71, 0.06), 0 2px 8px -2px rgba(2, 32, 71, 0.06)',
        card: '0 2px 8px -2px rgba(2, 32, 71, 0.08), 0 4px 20px -6px rgba(2, 32, 71, 0.08)',
        glow: '0 0 0 1px rgba(12, 140, 231, 0.08), 0 8px 30px -10px rgba(12, 140, 231, 0.2)',
        tealglow: '0 0 0 1px rgba(20, 184, 166, 0.08), 0 8px 30px -10px rgba(20, 184, 166, 0.2)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.35s ease-out both',
        scaleIn: 'scaleIn 0.25s ease-out both',
        floatUp: 'floatUp 0.45s ease-out both',
        pop: 'pop 0.3s ease-out both',
        slideIn: 'slideIn 0.3s ease-out both',
      },
    },
  },
  plugins: [],
};

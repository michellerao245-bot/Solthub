/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'solt-dark': '#0b1426',
        'solt-bg': '#050505',
        'solt-yellow': '#fbbf24',
        'solt-cyan': '#06b6d4',
        'solt-border': 'rgba(6, 182, 212, 0.2)', // Soft neon border
      },
      boxShadow: {
        'neon': '0 0 5px #06b6d4, 0 0 20px rgba(6, 182, 212, 0.2)',
        'neon-yellow': '0 0 5px #fbbf24, 0 0 20px rgba(251, 191, 36, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
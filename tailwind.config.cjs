const { text } = require("framer-motion/client");

module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2d5016',
          50: '#f4f7f2',
          100: '#e8efe4',
          200: '#c5d9b8',
        },
        secondary: {
          DEFAULT: '#f4b6bc',
          50: '#fef2f3',
          100: '#fde4e6',
          200: '#f9c8ce',
          300: '#f4b6bc',
          400: '#ef949d',
        },
        background: {
          light: '#fdfdfb',
          DEFAULT: '#fafaf8',
          dark: '#1f2937',
        },
        text: {
          light: '#fcfcfc',
          DEFAULT: '#1a1a1a',
          dark: '#fafaf8',
        },
      },
      fontFamily: {
        sans: ['Lora', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['Lora', 'monospace'],
      },
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          deep: '#1B2A4A',
          DEFAULT: '#2A3D6B',
          light: '#4A6A9A',
        },
        sand: {
          DEFAULT: '#F3EBD9',
          light: '#FAF5ED',
          dark: '#E5D9C4',
        },
        coral: {
          DEFAULT: '#E4572E',
          light: '#F07A5A',
          dark: '#C94A1F',
        },
        forest: {
          DEFAULT: '#2F6B4F',
          light: '#4A8A6A',
          dark: '#1F4A35',
        },
        gold: {
          DEFAULT: '#D9A441',
          light: '#E8BA6A',
          dark: '#C4902A',
        },
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'max-xs': { 'max': '320px' },
        'max-sm': { 'max': '480px' },
        'max-md': { 'max': '768px', 'min': '481px' },
        'max-lg': { 'max': '1024px' },
        'max-xl': { 'max': '1280px' },
        'custom-res': { 'min': '769px', 'max': '940px' }
      },
    },
  },
  plugins: [],
};

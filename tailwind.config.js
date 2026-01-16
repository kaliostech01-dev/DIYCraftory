export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fef3f2',
          100: '#fee5e2',
          200: '#fecfca',
          300: '#fcb0a6',
          400: '#f98272',
          500: '#f05945',
          600: '#dd3a26',
          700: '#ba2f1c',
          800: '#9a2a1b',
          900: '#80281d',
        }
      },
    },
  },
  plugins: [],
}

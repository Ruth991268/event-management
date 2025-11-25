/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',   // deep blue
        secondary: '#3B82F6', // bright blue
        accent: '#60A5FA',    // light blue
        neutral: {
          700: '#374151', // dark gray
          600: '#6B7280', // medium gray
          200: '#E5E7EB', // light gray
        },
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
      },
      boxShadow: {
        'md-custom': '0 4px 6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}

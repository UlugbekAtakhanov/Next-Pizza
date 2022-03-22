module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      screens: {
      "xs": "400px",
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        "orange": "#d1411e",
        "grey-color": "#AAAAAA"
      },
      fontFamily: {
        "dance": ["'Dancing Script', cursive"],
      },
      boxShadow: {
        'custom1': " 0px 0px 3px 1px rgba(34, 60, 80, 0.2)",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
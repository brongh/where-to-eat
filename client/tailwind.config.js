module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        sm: "440px",
        md: "547px",
        lg: "768px",
        xl: "1024px",
        "2xl": "1680px",
      },
    },
  },
  plugins: [],
}

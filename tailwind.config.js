/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { max: "500px" },
        // => @media (max-width: 500px) { ... }
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // عشان تقدر تستخدم dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/screens/*/*.tsx", "./src/components/*/*.tsx"],
  theme: {
    colors: {
      'cores': '#1C1C1C',
      'gray' : '#C9C9C9',
      'golden': '#B89D59',
      'blue': '#264672',
      'gray-light' : '#BBB9B7'
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'afro-teal': '#20686c',
        'afro-green': '#005236',
        'afro-mint': '#6bc4a6',
        'afro-orange': '#fe982a',
        'afro-brown': '#bc4f07',
        'white': '#ffffff',
        'black': '#000000',
        'afro-light': '#fff4e9',
        'afro-dark': '#131313',
        'afro-gray':'#9C9C9C',
        'afro-gray-dark':'#333333',
        'afro-gray-light':'#f5f5f5',
        'afro-gray-mid':'#7d7d7d',
        'afro-gray-mid-dark':'#2c2c2c',
        'afro-purple':'#65558f',
        'afro-purple-mid':'#8e5f5f',
        'afro-pink':'#c54e95',
        'afro-pink-mid':'#e68ec3',
        'afro-gray-mid-light':'#d9d9d9'
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}


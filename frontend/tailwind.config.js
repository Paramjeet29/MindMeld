/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      
      fontFamily: {
        sans: ['Lora', 'serif'], // Apply the Lora font as a fallback for sans serif
      },
    },
  },
  plugins: [require('flowbite/plugin'),],
}


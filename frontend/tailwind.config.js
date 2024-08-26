/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      transitionProperty: {
        'opacity-transform': 'opacity, transform',
      },
      keyframes: {
        'modal-enter': {
          '0%': { opacity: '0', transform: 'translateY(-300px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'modal-exit': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-250px)' },
        },
      },
      animation: {
        'modal-enter': 'modal-enter 600ms ease-in-out',
        'modal-exit': 'modal-exit 700ms ease-in-out',
      },
      
      fontFamily: {
        sans: ['Lora', 'serif'], // Apply the Lora font as a fallback for sans serif
      },
    },
  },
  plugins: [require('flowbite/plugin'),],
}


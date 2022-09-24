const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.vue",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'roboto': ['Roboto'],
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    borderColor: {
      ...colors
    }
  },
  plugins: [],
}

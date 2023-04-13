/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        purple_Dark: "#635FC7",
        purple_Light: "#A8A4FF",
        _dark: "#000112",
        almost_Dark: "#20212C",
        dark_Gray: "#2B2C37",
        medium_Gray: "#3E3F4E",
        _gray: "#828FA3",
        light_Blue: "#E4EBFA",
        almost_White: "#F4F7FD",
        _white: "#FFFFFF",
        _red: "#EA5555",
        light_Red: "#FF9898"
      }
    },
  },
  plugins: [],
}

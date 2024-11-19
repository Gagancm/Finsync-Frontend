/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Specify the file paths Tailwind should scan for classes
  ],
  theme: {
    extend: {
      spacing: {
        20: '5rem', // Custom spacing for ml-20
        16: '4rem', // Custom spacing for ml-16
      },
    },
  },
  plugins: [], // Add plugins here if needed
};

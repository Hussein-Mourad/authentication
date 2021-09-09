module.exports = {
  mode:"jit",
  purge: ['./pages/**/*.{js,jsx}', './components/**/*.jsx'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    
  ],
}

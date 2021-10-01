import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: true,
  fontFamily: {
    sans: ['Roboto', 'sans-serif'],
    serif: ['Roboto', 'serif'],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Roboto', 'serif'],
      },
    },
  },
})

import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: false,
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Roboto', 'serif'],
      },
    },
  },
})

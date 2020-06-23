module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.vue',
      './src/**/*.html'
    ]
  },
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
}

module.exports = {
  plugins: {
    'postcss-import': {
      plugins: [require('stylelint')()]
    },
    'postcss-url': {},
    'postcss-cssnext': {},
    'postcss-browser-reporter': {},
    'postcss-reporter': {}
  }
}

const path = require('path')
const pkg = require('./package')

module.exports = {
  entry: [
    // 'src/polyfills.js',
    'src/index.js'
  ],
  sourcemap: false,
  html: {
    title: pkg.productName,
    description: pkg.description,
    template: path.join(__dirname, 'index.ejs')
  },
  postcss: {
    plugins: [
      // Your postcss plugins
    ]
  },
  webpack(config) {
    config.output.publicPath = './'
    config.devtool = '#cheap-module-source-map'
    return config
  },
  presets: [
    require('poi-preset-bundle-report')()
  ]
}

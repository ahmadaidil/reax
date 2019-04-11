const path = require('../config/path')
const { env } = require('../config/env')

const clientDir = `${path.base}/${path.client}`
const buildDir = `${path.base}/${path.build}`

module.exports = {
  mode: env === 'production' ? 'production' : 'development',
  target: 'node',
  entry: [`${clientDir}/index.ssr.js`],
  output: {
    path: buildDir,
    filename: 'ssr.js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
      },
    ],
  },
}

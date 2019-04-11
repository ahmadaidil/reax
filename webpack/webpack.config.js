const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('../config/path')
const { env } = require('../config/env')

const clientDir = `${path.base}/${path.client}`
const serverDir = `${path.base}/${path.server}`
const buildDir = `${path.base}/${path.build}`

const isEnvProd = env === 'production'
const isEnvDev = env === 'development'

module.exports = {
  mode: isEnvProd ? 'production' : 'development',
  entry: [
    `${clientDir}/index.js`,
    isEnvDev && 'webpack-hot-middleware/client',
  ].filter(Boolean),
  output: {
    path: buildDir,
    filename: isEnvProd ? 'reax.[hash].js' : 'reax.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        include: clientDir,
        exclude: '/node_modules/',
        loader: 'babel-loader',
      },
    ],
  },
  // optimization: {
  //   minimize: isEnvProduction,
  //   minimizer: [
  //     // This is only used in production mode
  //     new TerserPlugin({
  //       terserOptions: {
  //         parse: {
  //           // we want terser to parse ecma 8 code. However, we don't want it
  //           // to apply any minfication steps that turns valid ecma 5 code
  //           // into invalid ecma 5 code. This is why the 'compress' and 'output'
  //           // sections only apply transformations that are ecma 5 safe
  //           // https://github.com/facebook/create-react-app/pull/4234
  //           ecma: 8,
  //         },
  //         compress: {
  //           ecma: 5,
  //           warnings: false,
  //           // Disabled because of an issue with Uglify breaking seemingly valid code:
  //           // https://github.com/facebook/create-react-app/issues/2376
  //           // Pending further investigation:
  //           // https://github.com/mishoo/UglifyJS2/issues/2011
  //           comparisons: false,
  //           // Disabled because of an issue with Terser breaking valid code:
  //           // https://github.com/facebook/create-react-app/issues/5250
  //           // Pending futher investigation:
  //           // https://github.com/terser-js/terser/issues/120
  //           inline: 2,
  //         },
  //         mangle: {
  //           safari10: true,
  //         },
  //         output: {
  //           ecma: 5,
  //           comments: false,
  //           // Turned on because emoji and regex is not minified properly using default
  //           // https://github.com/facebook/create-react-app/issues/2488
  //           ascii_only: true,
  //         },
  //       },
  //       // Use multi-process parallel running to improve the build speed
  //       // Default number of concurrent runs: os.cpus().length - 1
  //       parallel: true,
  //       // Enable file caching
  //       cache: true,
  //       sourceMap: false,
  //     }),
  //   ],
  // },
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Reax app',
      template: `${clientDir}/index.html`,
      // favicon: favicon here,
      filename: 'index.html',
      inject: 'body',
    }),
    isEnvDev && new webpack.HotModuleReplacementPlugin(),
    isEnvProd && new CopyWebpackPlugin([
      {
        from: `${serverDir}/prod.js`,
        to: `${buildDir}/server.js`,
      },
      {
        from: `${serverDir}/app.js`,
        to: `${buildDir}/server-app.js`,
      },
    ]),
  ].filter(Boolean),
}

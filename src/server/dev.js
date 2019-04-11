/* eslint no-console: 0 */

const express = require('express')
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')

const serverApp = require('./app')
const staticApp = require('../../build/ssr').default

const webpackConfig = require('../../webpack/webpack.config')

const path = require('../../config/path')
const { port } = require('../../config/env')

const app = express()

let compiler = {}

try {
  compiler = webpack(webpackConfig)
} catch (e) {
  console.log(e.message) // eslint-disable-line
}

const hotMiddleware = webpackHotMiddleware(compiler)
const devMiddleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
})

app.use(serverApp(staticApp, compiler))

app.use(devMiddleware)
app.use(hotMiddleware)

devMiddleware.waitUntilValid(() => {
  console.log('package is valid')
})

app.use(express.static(`${path.base}/${path.build}`))

app.listen(port, () => {
  console.log(`serve on http://localhost:${port}`)
})

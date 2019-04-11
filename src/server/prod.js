/* eslint no-console: 0 */

const path = require('path')
const express = require('express')

const serverApp = require('./server-app')
const staticApp = require('./ssr').default

const app = express()
const port = process.env.PORT || 8080

const buildDir = path.resolve(__dirname)

app.use(serverApp(staticApp, { outputPath: buildDir }))

app.use(express.static(buildDir))

app.listen(port, () => {
  console.log(`serve on http://localhost:${port}`)
})

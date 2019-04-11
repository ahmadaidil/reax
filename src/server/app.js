const fs = require('fs')
const path = require('path')
const app = require('express')()
const react = require('react')
const { renderToString } = require('react-dom/server')

module.exports = (staticApp, compiler) => {
  app.get('/', (req, res, next) => {
    const fileSystem = process.env.NODE_ENV === 'production' ? fs : compiler.outputFileSystem
    const filename = path.join(compiler.outputPath, 'index.html')
    fileSystem.readFile(filename, 'utf-8', (err, result) => {
      if (err) return next(err)
      const [head, tail] = result.split('{app}')
      const html = `
        ${head}${renderToString(react.createElement(staticApp))}${tail}
      `

      res.send(html)
    })
  })

  return app
}

/**
 * @file 步骤1. 与服务器集成
 * @author JoyWong
 */

const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()
const server = require('express')()

const port = 6724

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Hello</title>
        </head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(port)
console.log(`http://localhost:${port}`)
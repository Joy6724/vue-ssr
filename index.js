/**
 * @file 入口文件
 * @author JowWong
 */

const fs = require('fs')
const Vue = require('vue')
const createRenderer = require('vue-server-renderer').createRenderer
const server = require('express')()

const port = 6724

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })

  const content = {
    title: 'Hello Joy'
  }

  const renderer = createRenderer({
    template: fs.readFileSync('./index.template.html', 'utf-8')
  })
  renderer.renderToString(app, content, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(port)
console.log(`http://localhost:${port}`)
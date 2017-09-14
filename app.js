const path = require('path')
const {
  createPactSocketIO,
  generateDocs,
  parseSchema,
  generateClient
} = require('pact')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const tap = require('./tap')

const io = createPactSocketIO('api', [tap])

app.use('/dev/client.js', (req, res) => {
  res.set('Content-Type', 'application/javascript')
  return res.end(
    generateClient(process.env.URL || 'http://localhost', 'api', [
      parseSchema(tap.schema)
    ])
  )
})
app.use('/dev/doc.md', (req, res) => {
  const html = generateDocs([parseSchema(tap.schema)])
  return res
    .status(200)
    .type('html')
    .end(html)
})

io.attach(server)
server.listen(3000)

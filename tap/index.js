const path = require('path')
const schema = require('./schema.json')
const root = path.join(__dirname, 'api')
const models = require('./models')

module.exports = {
  schema,
  root
}

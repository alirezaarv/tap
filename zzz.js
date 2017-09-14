const api = require('./zz')
const jwt = require('jsonwebtoken')
const token = jwt.sign({ id: '59bae80f75f47155d2041944' }, 's')

api.setToken(token)

const exec = (func, req) => {
  func(req).then(
    r => {
      console.log('resolve', r)
    },
    r => {
      console.log('reject', r)
    }
  )
}

setTimeout(function() {
  exec(api.tap.generateAddress, {})
}, 100)

setTimeout(function() {
  exec(api.tap.getSections, {})
}, 200)

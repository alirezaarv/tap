const api = require('./zz')
const jwt = require('jsonwebtoken')
const token = jwt.sign({ id: '59bbba543103b60c79cde510' }, 's')
console.log(token)

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

/* setTimeout(function() {
  exec(api.tap.createTransaction, {
    desc: 'bayad be moz 20 bdam',
    to: '59bae80f75f47155d2041945',
    value: 20
  })
}, 300)

setTimeout(function() {
  exec(api.tap.getPersonalSections, {
    userId: '59bae80f75f47155d2041945'
  })
}, 400)

setTimeout(function() {
  exec(api.tap.getUser, {})
}, 500)
 */

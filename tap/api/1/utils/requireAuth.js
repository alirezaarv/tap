const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || 's'

const requireAuth = func => {
  return (context, request, callback) => {
    jwt.verify(context.token, secret, (err, decoded) => {
      if (err) {
        return callback('AUTH')
      }
      func(Object.assign({}, context, decoded), request, callback)
    })
  }
}

module.exports = requireAuth

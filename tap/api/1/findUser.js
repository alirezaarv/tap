const { requireAuth, redisCli } = require('./utils')

const func = (context, request, callback) => {
  redisCli.get(`tap:address:${request.address}`, (err, id) => {
    if (err) {
      return callback('UNKNOWN')
    }
    if (!id) {
      return callback('INVALID_ID')
    }
    return callback(null, { id })
  })
}

module.exports = requireAuth(func)

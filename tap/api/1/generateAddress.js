const uuid = require('uuid')
const { requireAuth, redisCli } = require('./utils')

const func = (context, request, callback) => {
  const randomAddress = uuid.v4()
  redisCli.set(
    `tap:address:${context.id}`,
    randomAddress,
    'EX',
    60 * 60 * 5,
    (err, res) => {
      if (err) {
        return callback('UNKOWN')
      }
      callback(null, { address: randomAddress })
    }
  )
}

module.exports = requireAuth(func)

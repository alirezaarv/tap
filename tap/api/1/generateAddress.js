const { requireAuth } = require('./utils')

const func = (context, request, callback) => {
  callback('NOT_IMPLIMENTED')
}

module.exports = requireAuth(func)

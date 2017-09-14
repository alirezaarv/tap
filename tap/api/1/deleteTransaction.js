const { requireAuth } = require('./utils')

const func = (context, request, callback) => {
  //add to latest section
  callback('NOT_IMPLIMENTED')
}

module.exports = requireAuth(func)

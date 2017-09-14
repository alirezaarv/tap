const { requireAuth } = require('./utils')

const func = (context, request, callback) => {
  //create section and pay all
  callback('NOT_IMPLIMENTED')
}

module.exports = requireAuth(func)

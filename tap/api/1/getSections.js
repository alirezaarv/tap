const { requireAuth, getSections } = require('./utils')

const func = (context, request, callback) => {
  getSections(context.id, { beforeId: request.beforeId }, (err, res) => {
    callback(err, res)
  })
}

module.exports = requireAuth(func)

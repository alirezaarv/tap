const { requireAuth, getPersonalSections } = require('./utils')

const func = (context, request, callback) => {
  getPersonalSections(
    context.id,
    request.userId,
    request.options || {},
    (err, res) => {
      callback(null, { beforeId: 'null', sections: res })
    }
  )
}

module.exports = requireAuth(func)

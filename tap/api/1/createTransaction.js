const { requireAuth, createTransaction } = require('./utils')

const func = (context, request, callback) => {
  createTransaction(
    request.desc,
    context.id,
    request.to,
    request.value,
    (err, result) => {
      if (err) {
        return callback('UNKNOWN')
      }
      callback(null, {
        id: `${result._id}`,
        desc: result.desc,
        section: result.section,
        to: `${result.to}`,
        value: result.value,
        date: result.date.getTime(),
        accepted: result.accepted,
        payed: result.payed
      })
    }
  )
}

module.exports = requireAuth(func)

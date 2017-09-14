const { requireAuth, getUserById } = require('./utils')

const func = (context, request, callback) => {
  getUserById(context.id, (err, user) => {
    if (err) {
      return callback('UNKNOWN')
    }
    callback(null, {
      fullname: user.fullname,
      phone: user.phone,
      credit: user.credit,
      cards: user.cards
    })
  })
}

module.exports = requireAuth(func)

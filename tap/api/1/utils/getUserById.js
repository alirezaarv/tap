const mongoose = require('mongoose')
const User = mongoose.model('User')

function getUserById(id, cb) {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      return cb('UNKNOWN')
    }
    if (!user) {
      return cb('ID_INVALID')
    }
    cb(null, user)
  })
}

module.exports = getUserById

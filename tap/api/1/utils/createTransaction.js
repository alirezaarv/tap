const mongoose = require('mongoose')
const Transaction = mongoose.model('Transaction')

function createTransaction(desc, from, to, value, cb) {
  Transaction.create({
    desc,
    from,
    to,
    value,
    date: Date.now()
  }).then(
    r => {
      cb(null, r)
    },
    r => {
      console.log('inja r', r)
      cb('UNKNOWN')
    }
  )
}

module.exports = createTransaction

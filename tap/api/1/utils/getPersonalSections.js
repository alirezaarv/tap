const mongoose = require('mongoose')
const async = require('async')
const Transaction = mongoose.model('Transaction')

function getTransactions(id, otherUserId, options, cb) {
  const beforeId = options.beforeId
  let query = {
    accepted: true,
    payed: false,
    $or: [
      { $and: [{ from: id }, { to: otherUserId }] },
      { $and: [{ from: otherUserId }, { to: id }] }
    ]
  }
  if (beforeId) {
    Object.assign(query, { _id: { $lt: beforeId } })
  }
  Transaction.find(query).then(
    resolve => {
      cb(null, resolve)
    },
    reject => {
      cb('UNKNOWN')
    }
  )
}

function groupTransactions(transactions) {
  let groups = {}
  transactions.forEach(function(e) {
    let element = { desc: e.desc, value: e.value, date: e.date.getTime() }
    groups[element.section ? `${element.section}` : 'unpayed']
      ? groups[element.section ? `${element.section}` : 'unpayed'].push(element)
      : (groups[element.section ? `${element.section}` : 'unpayed'] = [element])
  })
  return groups
}

function getPersonalSections(id, otherUserId, options, callback) {
  getTransactions(id, otherUserId, options, (err, transactions) => {
    if (err) {
      return callback(err)
    }
    const groups = groupTransactions(transactions)
    const sections = []
    for (var key in groups) {
      sections.push({ transactions: groups[key], value: 12, date: 12 })
    }
    callback(null, sections)
  })
}

module.exports = getPersonalSections

const mongoose = require('mongoose')
const Transaction = mongoose.model('Transaction')

function getTransactions(id, options, cb) {
  const beforeId = options.beforeId
  let query = { accepted: true, payed: false, $or: [{ from: id }, { to: id }] }
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

function groupTransactions(id, transactions) {
  let groups = {}
  transactions.forEach(function(element) {
    if (`${element.to}` === id) {
      groups[`${element.from}`] = groups[`${element.from}`]
        ? groups[`${element.from}`] + parseInt(element.value)
        : parseInt(element.value)
    } else {
      groups[`${element.to}`] = groups[`${element.to}`]
        ? groups[`${element.to}`] - parseInt(element.value)
        : 0 - parseInt(element.value)
    }
  })
  return groups
}

function getSections(id, options, cb) {
  getTransactions(id, options, (err, transactions) => {
    if (err) {
      return cb(err)
    }
    //console.log('inja transactions', transactions)
    const groups = groupTransactions(id, transactions)
    const sections = []
    //console.log('inja groups', groups)
    for (var key in groups) {
      //console.log('inja')
      sections.push({ user: key, value: groups[key] })
    }
    //console.log('inja sections', sections)
    cb(null, { sections })
  })
}

module.exports = getSections

const models = require('./tap/models')

models.User.db.dropDatabase()
models.Transaction.db.dropDatabase()
models.Section.db.dropDatabase()

let users = {}
function insertUsers() {
  models.User
    .create({
      fullname: 'alireza arvandi',
      phone: '09121212120'
    })
    .then(
      r => console.log('resolve', (users.me = r)),
      r => console.log('reject', r)
    )

  models.User
    .create({
      fullname: 'amirreza mozayani',
      phone: '09121212121'
    })
    .then(
      r => console.log('resolve', (users.moz = r)),
      r => console.log('reject', r)
    )

  models.User
    .create({
      fullname: 'alireza heydari',
      phone: '09121212122'
    })
    .then(
      r => console.log('resolve', (users.hi = r)),
      r => console.log('reject', r)
    )

  models.User
    .create({
      fullname: 'aria kosari',
      phone: '09121212123'
    })
    .then(
      r => console.log('resolve', (users.aria = r)),
      r => console.log('reject', r)
    )
}

function insertTransactions() {
  models.Transaction
    .create({
      desc: 'bara moz ghaza kharidam',
      from: users.moz._id,
      to: users.me._id,
      value: '10',
      date: Date.now(),
      accepted: true
    })
    .then(r => console.log('resolve', r), r => console.log('reject', r))
  models.Transaction
    .create({
      desc: 'bara moz kif kharidam',
      from: users.moz._id,
      to: users.me._id,
      value: '15',
      date: Date.now(),
      accepted: true
    })
    .then(r => console.log('resolve', r), r => console.log('reject', r))
  models.Transaction
    .create({
      desc: 'moz baram ketab kharid',
      from: users.me._id,
      to: users.moz._id,
      value: '10',
      date: Date.now(),
      accepted: true
    })
    .then(r => console.log('resolve', r), r => console.log('reject', r))
  models.Transaction
    .create({
      desc: 'moz baram koloche kharid',
      from: users.me._id,
      to: users.moz._id,
      value: '10',
      date: Date.now(),
      accepted: true
    })
    .then(r => console.log('resolve', r), r => console.log('reject', r))
  models.Transaction
    .create({
      desc: 'aria baram ghaza kharidam',
      from: users.me._id,
      to: users.aria._id,
      value: '10',
      date: Date.now(),
      accepted: true
    })
    .then(r => console.log('resolve', r), r => console.log('reject', r))
}

setTimeout(insertUsers, 100)
setTimeout(insertTransactions, 300)

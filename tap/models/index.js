const mongoose = require('mongoose')
mongoose.connect('mongodb://mongo:27017/tap')

const User = require('./User')
mongoose.model('User', User)

const Transaction = require('./Transaction')
mongoose.model('Transaction', Transaction)

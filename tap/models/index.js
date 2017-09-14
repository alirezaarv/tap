const mongoose = require('mongoose')
mongoose.connect('mongodb://mongo:27017/tap')

const UserSchema = require('./User')
const User = mongoose.model('User', UserSchema)

const TransactionSchema = require('./Transaction')
const Transaction = mongoose.model('Transaction', TransactionSchema)

const SectionSchema = require('./Section')
const Section = mongoose.model('Section', SectionSchema)

module.exports = { User, Transaction, Section }

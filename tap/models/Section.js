const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  value: { type: Schema.Types.String, required: true },
  date: { type: Schema.Types.Date, required: true }
})

module.exports = schema

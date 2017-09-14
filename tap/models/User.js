const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  fullname: { type: Schema.Types.String, required: true },
  phone: { type: Schema.Types.String, required: true },
  cards: { type: Schema.Types.Array, default: [] },
  credit: { type: Schema.Types.Number, default: 0 }
})

module.exports = schema

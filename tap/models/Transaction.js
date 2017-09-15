const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  desc: { type: Schema.Types.String, required: true },
  section: { type: Schema.Types.ObjectId, default: null },
  from: { type: Schema.Types.ObjectId, required: true },
  to: { type: Schema.Types.ObjectId, required: true },
  value: { type: Schema.Types.Number, required: true },
  date: { type: Schema.Types.Date, required: true },
  accepted: { type: Schema.Types.Boolean, default: false },
  payed: { type: Schema.Types.Boolean, default: false }
})

module.exports = schema

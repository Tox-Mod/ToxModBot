const mongoose = require("mongoose")

let balance = mongoose.Schema({
  user: { type: String },
  balance: { type: Number, default: 0 },
  bank: { type: Number, default: 0}
})

module.exports = mongoose.model("balance", balance)

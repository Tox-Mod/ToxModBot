const mongoose = require("mongoose")

let items = mongoose.Schema({
  user: { type: String },
  Inventory: { type: Object },
})

module.exports = mongoose.model("items", items)

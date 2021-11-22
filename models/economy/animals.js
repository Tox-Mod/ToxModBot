const mongoose = require("mongoose")

let animals = mongoose.Schema({
  user: { type: String },
  Inventory: { type: Object },
})

module.exports = mongoose.model("animals", animals)

const mongoose = require("mongoose")

let equippedItem =  mongoose.Schema({
  user: { type: String, required: true,},
  itemEquipped: { type: String, default: "Default Shotgun" }
})

module.exports = mongoose.model("equippedItem", equippedItem)

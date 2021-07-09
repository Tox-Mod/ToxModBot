const mongoose = require("mongoose");

const moneySchema = mongoose.Schema({
    userID: String,
    bug:String,
})

module.exports = mongoose.model("bugreports", moneySchema);
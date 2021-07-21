const mongoose = require("mongoose");
let sitebans = new mongoose.Schema({
 user: String,
 reason: String,
 moderator: String
});

module.exports = mongoose.model("sitebans", sitebans);
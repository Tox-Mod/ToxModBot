const mongoose = require("mongoose");

const serverusers = mongoose.Schema({
    userID: String,
    bio: String,
})

module.exports = mongoose.model("guild_users", serverusers);
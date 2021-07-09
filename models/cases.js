const mongoose = require("mongoose");

const servercases = mongoose.Schema({
    userID: String,
    reason:String,
    action: String,
    serverID: String,
    Moderator: String,
    case: Number,
    time: String,
    duration: String
})

module.exports = mongoose.model("guild_actions", servercases);
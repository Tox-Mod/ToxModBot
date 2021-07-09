const mongoose = require("mongoose");

const serverclock = mongoose.Schema({
    userID: String,
    time: Number,
    timenow: Number,
    action: String,
    serverID: String
})

module.exports = mongoose.model("guild_clocks", serverclock);
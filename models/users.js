const mongoose = require("mongoose");

const serverusers = mongoose.Schema({
    userID: String,
    bio: {type: String, default: null},
    website: {type: String, default: null},
    github: {type: String, default: null},
    twitter: {type: String, default: null},
    instagram: {type: String, default: null}

})

module.exports = mongoose.model("guild_users", serverusers);
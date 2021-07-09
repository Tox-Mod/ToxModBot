const mongoose = require("mongoose");

const theservers = mongoose.Schema({
    antispam: String,
    maxwarns: String,
    guildID: String,
    mutedrole: String,
    prefix: String,
    welcome: String,
    leave: String,
    audit: String,
    mod: String,
    autorole: String,
    botautorole: String,
    antiraid: String,
    welcomemsg: String,
    leavemsg: String,
    wlembeds: { Type: Boolean, default: false },
    private: String,
});

module.exports = mongoose.model("guilds", theservers);
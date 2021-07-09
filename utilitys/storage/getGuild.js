const SERVERS = require('../../models/servers');

async function getGuild(guildID) {

    let guild = await SERVERS.findOne({
        guildID: guildID
    });

    return guild;
}


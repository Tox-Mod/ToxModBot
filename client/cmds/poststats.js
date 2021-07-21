const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');
const CLOCK = require('@Database/clock');
const moment = require('moment');
const fetch = require('node-fetch');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

const BotLists = require('@Settings/botlists');

module.exports.run = async (client, message, args, params) => {

       fetch(`https://paradisebots.net/api/v1/bot/${client.user.id}`, {
            method: "POST",
            headers: {
                Authorization: BotLists.Paradise_AUTH,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ server_count: client.guilds.cache.size, shard_count: '0' }),
        }).then(response => response.text());

        fetch(`https://api.infinitybotlist.com/bot/${client.user.id}`, {
            method: "POST",
            headers: {
                authorization: BotLists.IBL_AUTH,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ servers: client.guilds.cache.size, shards: '0' }),
        }).then(response => response.text());

        let StatsPost = new MessageEmbed()
         .setTitle('Okay chief!')
         .setColor(Colors.Primary)
         .setDescription('Posted Stats to all Bot Lists!')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        return message.channel.send(StatsPost);

    }

module.exports.help = {
    name: 'poststats',
    category: 'owner',
    aliases: ['ps', 'post'],
    description: 'Post Stats to all Bot Lists',
    example: '``poststats``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: true,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

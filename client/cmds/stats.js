const Discord = require('discord.js');
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

    try {

        let guilds = client.guilds.cache.size;
        let users =  client.users.cache.size;
        let channels = client.channels.cache.size;

        let embed = new Discord.MessageEmbed()
         .setAuthor('Tox Mod Statistics', client.user.displayAvatarURL({ dynamic: true }))
         .setColor(Colors.Secondary)
         .setThumbnail(client.user.displayAvatarURL({ dynamic: true}))
         .setDescription('Some kinda useful info')
         .addField('Created On', `${moment(client.user.createdAt).format("MM/DD/YYYY HH:mm:ss A")}`, true)
         .addField('Bot Owner', `[Toxic Dev](https://discordapp.com/users/510065483693817867)`, true)
         .addField('Bot Version', `v${Embeds.Version}`, true)
         .addField('Discord.js', ```v${Discord.version}```, true)
         .addField('Ping/Latency', ```${client.ws.ping}ms```, true)
         .addField('Made Using', 'Node, Javascript, EJS', true)
         .addField('Total Guilds', ```${guilds}```, true)
         .addField('Total Users', ```${users}```, true)
         .addField('Total Channels', ```${channels}```, true)
         .addField('Total Shards', ```${client.shard.count}```, true)
         .addField('Total Commands', ```${client.commands.size}```, true)
         .addField('Useful Links', `[Dashboard](https://toxmod.xyz/dashboard) | [Support](https://toxmod.xyz/discord) | [Docs](https://docs.toxmod.xyz) | [GitHub](https://github.com/Tox-Mod/ToxModBot)`, true)
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

         return message.channel.send(embed);


    } catch (err) {

        let ErrorEmbed = new Discord.MessageEmbed()
         .setTitle('Internal Error | Hmmm')
         .setColor(Colors.Error)
         .setDescription('Something went wrong here, Please try again or Contact my Dev Team.')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        return message.channel.send(ErrorEmbed);
    }
}

module.exports.help = {
    name: 'stats',
    category: 'info',
    aliases: ['bi', 'bs', 'statistics'],
    description: 'View some Statistics for Tox Mod',
    example: '``stats``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["EMBED_LINKS"],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

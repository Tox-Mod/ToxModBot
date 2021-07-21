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

        let embed = new MessageEmbed()
         .setAuthor('Vote for Tox Mod', Images.Animated)
         .setColor(Colors.Primary)
         .setDescription('Like the bot? vote for it here!')
         .addField('Paradise Bots', '[Vote Here](https://paradisebots.net/bots/631558023109804032/vote) | [Bot Page](https://paradisebots.net/bots/631558023109804032)', true)
         .addField('Botrix List', '[Vote Here](https://botrix.cc/vote/631558023109804032) | [Bot Page](https://botrix.cc/bots/631558023109804032/)', true)
         .addField('Next Gen Bots', '[Vote Here](https://nextgenbots.xyz/bots/631558023109804032/vote) | [Bot Page](https://nextgenbots.xyz/bots/631558023109804032)', true)
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

  
        return message.channel.send(embed)
        
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
    name: "vote",
    category: "info",
    aliases: ['upvote'],
    description: "vote for the Tox Mod!",
    example: "``vote``"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["MANAGE_CHANNELS"],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
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

    try {

        message.guild.channels.cache.map(Channel => {
            Channel.updateOverwrite(message.guild.id, {
                SEND_MESSAGES: true
            })
        })

        let embed2 = new MessageEmbed()
        .setTitle('🔒 Channel Lockdown Lifted')
        .setColor(Colors.Primary)
        .setDescription(`All channels are no longer under Lockdown!`)
        .setTimestamp()
        .setFooter(Embeds.Footer, Images.Animated)

        message.channel.send(embed2)

        SERVERS.findOne({ guildID: message.guild.id }, (err, res) => {

            let logChan = message.guild.channels.cache.get(res.mod);

            if (logChan) {

                let embed = new MessageEmbed()
                 .setTitle('🔒 Action: Channel Update')
                 .setColor(Colors.Primary)
                 .setDescription(`Lockdown for ``All Channels`` has been lifted`)
                 .addField('Moderator', `${message.author.tag}`, true)
                 .setTimestamp()
                 .setFooter(Embeds.Footer, Images.Animated)

                 logChan.send(embed)
            }
        })
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
    name: 'unlockdownall',
    category: 'mod',
    aliases: ['uldall'],
    description: 'Unlock all channels currently under Lockdown by Tox Mod.',
    example: '``unlockdown [#channel]``'
}

module.exports.requirements = {
    userPerms: ['MANAGE_CHANNELS'],
    clientPerms: ['MANAGE_CHANNELS'],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
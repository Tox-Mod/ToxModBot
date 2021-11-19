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

        let channelArgs = args.slice(0).join(" ");

        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(channelArgs) || message.guild.channels.cache.find(ch => ch.name === channelArgs);

        if (!Channel) Channel = message.channel;

        Channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: true
        });

        SERVERS.findOne({ guildID: message.guild.id }, (err, res) => {

            let logChan = message.guild.channels.cache.get(res.mod);

            if (logChan) {

                let embed = new MessageEmbed()
                 .setTitle('🔒 Action: Channel Update')
                 .setColor(Colors.Primary)
                 .setDescription(`Lockdown for ${Channel.name} has been lifted`)
                 .addField('Moderator', `${message.author.tag}`, true)
                 .setTimestamp()
                 .setFooter(Embeds.Footer, Images.Animated)

                 logChan.send(embed)
            }
        })

        let embed2 = new MessageEmbed()
         .setTitle('🔒 Channel Lockdown Lifted')
         .setColor(Colors.Primary)
         .setDescription(`${Channel.name} is no longer under Lockdown`)
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        return message.channel.send(embed2)

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
    name: 'unlockdown',
    category: 'mod',
    aliases: ['uld'],
    description: 'Unlock a channel currently under Lockdown by Tox Mod.',
    example: '``unlockdown [#channel]``'
}

module.exports.requirements = {
    userPerms: ['MANAGE_ROLES'],
    clientPerms: ['MANAGE_ROLES'],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');
const moment = require('moment')

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

    try {

        message.guild.channels.cache.map(chan => {
            channel.updateOverwrite(message.guild.id, {
                SEND_MESSAGES: false
            })
        })

        let UpdateEmbed = new MessageEmbed()
         .setTitle('🔒 All Channel Lockdown Successful!')
         .setColor(Colors.Primary)
         .setDescription('Okay, all channels i have permissons for are under lockdown.')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        message.channel.send(UpdateEmbed);


        SERVERS.findOne({ guildID: message.guild.id }, (err, res) => {

            let logChan = message.guild.channels.cache.get(res.mod);

            if (logChan) {

                let LogEmbed = new MessageEmbed()
                 .setTitle('🔒 Action: Channel Lockdown')
                 .setColor(Colors.Primary)
                 .setDescription(`All channels are under Lockdown`)
                 .addField('Moderator', `${message.author.tag}`, true)
                 .setTimestamp()
                 .setFooter(Embeds.Footer, Images.Animated)

                logChan.send(LogEmbed);
            }
        })
    } catch (err) {

        let ErrorEmbed = new MessageEmbed()
         .setTitle('Internal Error | Hmmm')
         .setColor(Colors.Error)
         .setDescription('Something went wrong here, Please try again or Contact my Dev Team.')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        return message.channel.send(ErrorEmbed);

    }
}

module.exports.help = {
    name: 'lockdownall',
    category: 'mod',
    aliases: ['ldall'],
    description: 'Lockdown all channels, No one can talk!',
    example: '``lockdownall``'
}

module.exports.requirements = {
    userPerms: ["MANAGE_CHANNELS"],
    clientPerms: ["MANAGE_CHANNELS"],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
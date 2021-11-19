const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');
const moment = require('moment')

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

    try {

        let channelArgs = agrs.slice(0).join(" ");

        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(channelArgs) || message.guild.channels.cache.find(c => c.name === channelArgs);

        if (!channel) channel = message.channel;

        channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        });

        let UpdateEmbed = new MessageEmbed()
          .setTitle('🔒 Channel Lockdown Successful!')
          .setColor(Colors.Primary)
          .setDescription(`${channel.name} is now under lockdown`)
          .setTimestamp()
          .setFooter(Embeds.Footer, Images.Animated)

          message.channel.send(UpdateEmbed)

          SERVERS.findOne({ guildID: message.guild.id }, (err, res) => {

            let logChan = message.guild.channels.cache.get(res.mod)

            if (logChan) {

                let LogEmbed = new MessageEmbed()
                 .setTitle('🔒 Action: Channel Lockdown')
                 .setColor(Colors.Primary)
                 .setDescription(`${channel.name} is now under lockdown`)
                 .addField('Moderator', `${message.author.tag}`, true)
                 .setTimestamp()
                 .setFooter(Embeds.Footer, Images.Animated)

            return logChan.send(LogEmbed);
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
    name: 'lockdown',
    category: 'mod',
    aliases: ['ld'],
    description: 'Lockdown a Channel in case of a Raid! Provide no Args for Current Channel.',
    example: '``lockdown [#channel]``'
}

module.exports.requirements = {
    userPerms: ["MANAGE_ROLES"],
    clientPerms: ["MANAGE_ROLES"],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

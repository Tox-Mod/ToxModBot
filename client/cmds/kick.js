const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

    try {

        let NoUserMsg = new MessageEmbed()
        .setTitle('Error | No User Provided')
        .setColor(Colors.Error)
        .setDescription('Please provide a user for this Action!')
        .setTimestamp()
        .setFooter(Embeds.Footer, Images.Animated)

      if (!args[0]) return message.channel.send(NoUserMsg);

      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

      if (user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send()

      let reason = args.slice(1).join(" ");

      if (!reason) reason = 'No reason provided!'

      if (user) {

        const member = message.guild.member(user);

        if (member) {

            
        }
      }

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
    name: 'kick',
    category: 'mod',
    aliases: ['hban'],
    description: 'Ban a user who is not an Active Member of the Server',
    example: '``hackban <userID> [Reason]``'
}

module.exports.requirements = {
    userPerms: ["BAN_MEMBERS"],
    clientPerms: ["BAN_MEMBERS"],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
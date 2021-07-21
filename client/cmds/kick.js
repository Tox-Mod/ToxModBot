const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');
const moment = require('moment')

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

            let cases = await CASES.find({ userID: member.id });

            member.kick('You was kicked for some reason boii!').then(() => {
                SERVERS.findOne({ guildID: message.guild.id }, async (err, res) => {

                    let channel = message.guild.channels.cache.get(res.mod);

                    if (channel) {

                        let KickLog = new MessageEmbed()
                          .setTitle('👢 Action: Kick')
                          .setColor(Colors.Error)
                          .setDescription(`Yeet, ${member.user.tag} has been kicked from the server!`)
                          .addField('Moderator', `${message.author.tag}`, true)
                          .addField('Reason', `${reason}`, true)
                          .addField('Users Infractions', `${cases.length} Total Cases`, true)
                          .setTimestamp()
                          .setFooter(Embeds.Footer, Images.Animated)

                        channel.send(KickLog).catch(() => {});
                    }
                })

                let KickEmbed = new MessageEmbed()
                 .setTitle('That shit head is gone!')
                 .setColor(Colors.Primary)
                 .setDescription(`Okay, ${member.user.tag} has been Kicked for ``${reason}``.`)
                 .setTimestamp()
                 .setFooter(Embeds.Footer, Images.Animated)

                message.channel.send(KickEmbed)

                CASES.find({ serverID: message.guild.id }).sort([['descending']]).exec((err, res) => {
                    let cases1 = new CASES({
                        userID: member.id,
                        reason: reason,
                        action: "Kick",
                        Moderator: message.author.id,
                        serverID: message.guild.id,
                        time: moment(message.createdAt).format('MM/DD/YYYY HH:mm:ss A'),
                        case: res.length + 1
                    })

                    cases1.save();
                })

                let embed = new MessageEmbed()
                  .setTitle('Uh-Oh, What did you do?')
                  .setColor(Colors.Error)
                  .setDescription('You have been kicked from a Guild that i manage!')
                  .addField('Guild Name', `${message.guild.name}`, true)
                  .addField('Moderator', `${message.author.tag}`, true)
                  .addField('Reason', `${reason}`, true)
                  .setTimestamp()
                  .setFooter(Embeds.Footer, Images.Animated)
            })

            let Hmmm = new MessageEmbed()
            .setTitle('Uh-Oh, What did you do?')
            .setColor(Colors.Error)
            .setDescription('I was unable to kick that user, Check their roles and permissions and try again!')
            .setTimestamp()
            .setFooter(Embeds.Footer, Images.Animated)

            .catch(() => message.channel.send(Hmmm)) 
        }
      } else {
          message.reply("Bruhh, I can't kick the air and would look stupid if i tried. Gimme someone to kick noob!")
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
    aliases: ['k'],
    description: 'Kick a User from your Discord Server',
    example: '``kick <@User> [Reason]``'
}

module.exports.requirements = {
    userPerms: ["KICK_MEMBERS"],
    clientPerms: ["KICK_MEMBERS"],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
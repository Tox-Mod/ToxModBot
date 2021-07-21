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

        let embed = new MessageEmbed()
         .setTitle('Woah, You sure bud!')
         .setColor(Colors.Error)
         .setDescription('Please provide a user for the action!')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

         if (!args[0]) return message.channel.send(embed)

         let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

         let embed2 = new MessageEmbed()
          .setTitle('Lolz, You wish i could!')
          .setColor(Colors.Error)
          .setDescription('Unable to find that user! Please provide a valid User Mention or ID')
          .setTimestamp()
          .setFooter(Embeds.Footer, Images.Animated)

          if (!banMember) return message.channel.send(embed2);

          let reason = args.slice(1).join(" ");

          if (!reason) reason = 'No reason provided!'

          let embed3 = new MessageEmbed()
           .setTitle('LMFAO, No Bro')
           .setColor(Colors.Error)
           .setDescription("Unable to ban users with roles that are equal to or higher then your roles.")
           .setTimestamp()
           .setFooter(Embeds.Footer, Images.Animated)

          if (banMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(embed3)

          message.guild.members.ban(banMember, { days: 1, reason: reason }).then(() => {

            message.guild.members.unban(banMember.id, { reason: "Softban Expired" })

            let embed4 = new MessageEmbed()
             .setTitle('👢 Softban Successful')
             .setColor(Colors.Primary)
             .setDescription(`${banMember.user.tag} has been yeeted... What a noob!. They can return in 24 Hours.`)
             .addField('Moderator', `${message.author.tag}`, true)
             .addField('Reason', `${reason}`, true)
             .setTimestamp()
             .setFooter(Embeds.Footer, Images.Animated)

            message.channel.send(embed4);

            SERVERS.findOne({ guildID: message.guild.id }, (err, res) => {

                let logChan = message.guild.channels.cache.get(res.mod);

                if (logChan) {

                    let embed5 = new MessageEmbed()
                     .setTitle('👢 Action: Softban')
                     .setColor(Colors.Error)
                     .addField('Banned User', `${banMember.user.tag}`, true)
                     .addField('Moderator', `${message.author.tag}`, true)
                     .addField('Reason', `${reason}`, true)
                     .setTimestamp()
                     .setFooter(Embeds.Footer, Images.Animated)

                    logChan.send(embed5)
                }
            })

            CASES.find({ serverID: message.guild.id }).sort([['descending']]).exec((err, response) => {

                let userCases = new CASES({
                    userID: banMember.user.id,
                    reason: reason,
                    action: "SoftBan",
                    Moderator: message.author.id,
                    serverID: message.guild.id,
                    time: moment(message.createdAt).format('MM/DD/YYYY HH:mm:ss A'),
                    case: res.length + 1
                })

                userCases.save()

                let embed6 = new MessageEmbed()
                 .setTitle('Woah, What did you do!')
                 .setColor(Colors.Error)
                 .setDescription(`You have been banned from ${message.guild.name} and may return in ``24 Hours```)
                 .addField('Case Number', `${res.length}`, true)
                 .addField('Moderator', `${message.author.tag} (${message.author.id})`, true)
                 .addField('Reason', `${reason}`, true)
                 .setTimestamp()
                 .setFooter(Embeds.Footer, Images.Animated)

                 banMember.send(embed6).catch(() => {});

            })
          }).catch(() => {

            let embed7 = new MessageEmbed()
             .setTitle('Whoops, Something went wrong!')
             .setColor(Colors.Error)
             .setDescription('I was unable to Softban that user, Check if their roles are higher then mine or if they have Admin Perms.')
             .setTimestamp()
             .setFooter(Embeds.Footer, Images.Animated)

          return message.channel.send(embed7)
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
    name: 'softban',
    category: 'mod',
    aliases: ['sb', 'sban'],
    description: 'Ban a user from the Server for 24 Hours',
    example: '``softban <UserID> [reason] || softban <@User> [reason]``'
}

module.exports.requirements = {
    userPerms: ['BAN_MEMBERS'],
    clientPerms: ['BAN_MEMBERS'],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
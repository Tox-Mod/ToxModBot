const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

    let NoCaseNumber = new MessageEmbed()
      .setTitle('Error | Invalid Args')
      .setColor(Colors.Error)
      .setDescription('Please provide a valid Case Number')
      .setTimestamp()
      .setFooter(Embeds.Footer, Images.Animated)

    if (!args[0]) return message.channel.send(NoCaseNumber);

    CASES.findOne({ serverID: message.guild.id, case: args[0] }, (err, res) => {

        if (!res) {

            let InvalidCase = new MessageEmbed()
              .setTitle('Error | Invalid Case')
              .setColor(Colors.Error)
              .setDescription('Cannot find a Case with that Number.')
              .setTimestamp()
              .setFooter(Embeds.Footer, Images.Animated)

            return message.channel.send(InvalidCase);
        }

        CASES.find({ serverID: message.guild.id, userID: res.userID}).sort([['descending']]).exec((err, response) => {

            let reason = '';
            let mod = '';
            let time = '';
            let duration = '';

            if (res.reason == '') {

                reason = 'No reason provided!'
            } else {

                reason = res.reason
            }

            if (res.time == undefined) {

                time = 'No time recorded.'
            } else {

                time = res.time
            }

            if (res.duration == undefined) {

                duration = 'No duration for this action.'
            } else {

                duration = res.duration
            }

            if (res.Moderator == undefined) {

                mod = 'Moderator was not defined.'
            } else {

                client.users.fetch(res.Moderator).then(member => {

                    mod = member.tag
                })
            }

            let CaseNumber = response.length - 1

            client.users.fetch(res.userID).then(member => {

                let CaseEmbed = new MessageEmbed()
                  .setTitle('Case Information')
                  .setColor(Colors.Primary)
                  .setThumbnail(member.displayAvatarURL({ dynamic: true }))
                  .setDescription(`${member.tag} has ${CaseNumber} other cases in this server!`)
                  .addField('User ID', `${res.userID}`, true)
                  .addField('Reason', `${reason}`, true)
                  .addField('Action', `${res.action}`, true)
                  .addField('Time', `${time}`, true)
                  .addField('Moderator', `${mod}`, true)
                  .addField('Duration', `${duration}`, true)
                  .setTimestamp()
                  .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

                  return message.channel.send(CaseEmbed);
            })
        })
    })
}

module.exports.help = {
    name: 'case',
    category: 'info',
    aliases: ['ci', 'infraction'],
    description: 'Get some info about a Specific Case/Infraction',
    example: '``case <number>``'
}

module.exports.requirements = {
    userPerms: ['MANAGE_GUILD'],
    clientPerms: ['EMBED_LINKS', 'SEND_MESSAGES'],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

    let InvalidArgs = new MessageEmbed()
      .setTitle('Error | Invalid Args')
      .setColor(Colors.Error)
      .setDescription('Please provide a valid Case Number')
      .setTimestamp()
      .setFooter(Embeds.Footer, Images.Animated)

    if (!args[0]) return message.channel.send(InvalidArgs);

    if (args[0]) {

        CASES.findOneAndDelete({ serverID: message.guild.id, case: args[0] }, (err, res) => {

            if (!res) {

                let InvalidCase = new MessageEmbed()
                  .setTitle('Error | Invalid Case')
                  .setColor(Colors.Error)
                  .setDescription('Unable to find the Provided Case Number.')
                  .setTimestamp()
                  .setFooter(Embeds.Footer, Images.Animated)

                return message.channel.send(InvalidCase);
            } else {

                SERVERS.findOne({ guildID: message.guild.id }, (err, res) => {

                    let LogChannel = message.guild.channels.cache.get(res.mod);

                    if (LogChannel) {

                        let CaseDelLog = new MessageEmbed()
                          .setTitle('Action: Case Deleted')
                          .setColor(Colors.Primary)
                          .setDescription('A Case/Infraction has been Deleted!')
                          .addField('Case Number', `#${agrs[0]}`, true)
                          .addField('Moderator', `${message.author.tag}`, true)
                          .setTimestamp()
                          .setFooter(Embeds.Footer, Images.Animated)

                        LogChannel.send(CaseDelLog);
                    }
                })

                let CaseDelMsg = new MessageEmbed()
                  .setTitle('Action: Case Deleted')
                  .setColor(Colors.Primary)
                  .setDescription(`Case #${args[0]} has been deleted from the server`)
                  .setTimestamp()
                  .setFooter(Embeds.Footer, Images.Animated)

                return message.channel.send(CaseDelMsg);
            }
        })
    }
}

module.exports.help = {
    name: 'casedelete',
    category: 'mod',
    aliases: ['cd', 'casedel', 'delcase'],
    description: 'Delete a Case/Infraction by Number!',
    example: '``casedelete <number>``'
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
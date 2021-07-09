const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

    await message.delete().catch(() => {});

    if (isNaN(args[0])) {

        let InvalidInteger = new MessageEmbed()
          .setTitle('Error | Invalid Usage')
          .setColor(Colors.Error)
          .setDescription('Please provide a valid Integer from ``1 - 99``')
          .setTimestamp()
          .setFooter(Embeds.Footer, Images.Animated)

        return message.channel.send(InvalidInteger);
    }

    if (args[0] > 100) {

        let InvalidAmount = new MessageEmbed()
          .setTitle('Error | Invalid Usage')
          .setColor(Colors.Error)
          .setDescription('Please provide a valid Integer from ``1 - 99`` (99 is Maximum)')
          .setTimestamp()
          .setFooter(Embeds.Footer, Images.Animated)

          return message.channel.send(InvalidAmount);
    }

    let InvalidArgs = new MessageEmbed()
      .setTitle('Error | Invalid Args')
      .setColor(Colors.Error)
      .setDescription('Please provide an amount of Messages to Delete')
      .setTimestamp()
      .setFooter(Embeds.Footer, Images.Animated)

    if (!args[0]) return message.channel.send(InvalidArgs);

    let BulkDeleteMsg = new MessageEmbed()
      .setTitle('Okay then, Standby!')
      .setColor(Colors.Primary)
      .setDescription(`I have successfully deleted ${args[0]} messages`)
      .setTimestamp()
      .setFooter(Embeds.Footer, Images.Animated)

    await message.channel.bulkDelete(args[0]).catch(() => {});

    message.channel.send(BulkDeleteMsg).then(msg => msg.delete({ timeout: 3000 }));

    SERVERS.findOne({ serverID: message.guild.id }, (err, db) => {

        let LogChannel = message.guild.channels.cache.get(db.mod)

        if (LogChannel) {

            let BulkDeleteLog = new MessageEmbed()
              .setTitle('Action: Bulk Delete Messages')
              .setColor(Colors.Primary)
              .addField('Amount', `${args[0]}`, true)
              .addField('Moderator', `${message.author.tag}`, true)
              .addField('Channel', `${message.channel.name}`, true)

            LogChannel.send(BulkDeleteLog);
        }
    })
}

module.exports.help = {
    name: 'clear',
    category: 'mod',
    aliases: ['purge', 'prune', 'bulkdelete', 'bd'],
    description: 'Delete a Specified number of Messages.',
    example: '``clear <Amount>``'
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
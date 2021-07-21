const { MessageEmbed } = require('discord.js');
const SERVERS = require('@Database/servers');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

    let guilds = client.guilds.cache.size;

    let users =  client.users.cache.size;

    let channels = client.channels.cache.size;

    let embed = new MessageEmbed()
      .setTitle('Info and Statistics')
      .setColor(Colors.Primary)
      .setThumbnail(Images.Animated)
      .setImage(Images.Banner)
      .setDescription('Here is some Useful Info for you Curious Lookers!')
      .addField('Guild Count', `${guilds}`, true)
      .addField('Channel Count', `${channels}`, true)
      .addField('User Count', `${users}`, true)
      .addField('Command Count', `${client.commands.size}`, true)
      .addField('Version', 'v2.0.0-Beta', true)
      .addField('Framework', 'discord.js (v12.5.3)', true)
      .addField('Language', 'Javascript', true)
      .addField('Primary Language', 'English', true)
      .addField('Latency and Ping', `${client.ws.ping}ms`, true)
      .addField('Created On', `${moment(client.user.createdAt).format("MM/DD/YYYY HH:mm:ss A")}`, true)
      .addField('Created By', '', true)
      .setTimestamp()
      .setFooter(Embeds.Footer, Images.Animated)

      return message.channel.send(embed)
}

module.exports.help = {
    name: 'about',
    category: 'info',
    aliases: ['botinfo', 'info', 'stats', 'bi', 'bs'],
    description: 'Shows some information about Tox Mod',
    example: '``help <CommandName>``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['SEND_MESSAGES', 'EMBED_LINKS'],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

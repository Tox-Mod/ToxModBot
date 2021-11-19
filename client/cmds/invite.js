const { MessageEmbed } = require('discord.js');
const SERVERS = require('@Database/servers');
const moment = require('moment');
const fetch = require('node-fetch');
const version = require('../../package.json')

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

    let embed = new MessageEmbed()
      .setTitle('Tox Mod Invite')
      .setColor(Colors.Primary)
      .setThumbnail(Images.Animated)
      .setDescription('Woah, You think im cool?!')
      .addField('Link', `https://toxmod.xyz/invite`, true)
      .setTimestamp()
      .setFooter(Embeds.Footer, Images.Animated)

      return message.channel.send(embed)
}

module.exports.help = {
    name: 'invite',
    category: 'info',
    aliases: ['inv', 'add'],
    description: 'Invite Tox Mod to your Server!',
    example: '``invite``'
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

const { MessageEmbed } = require('discord.js');
const SERVERS = require('@Database/servers');
const moment = require('moment');
const fetch = require('node-fetch');
const package = require('../../package.json')

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');
const { InfinityBots } = require('infinity-bots');
const ibl = new InfinityBots('631558023109804032');

module.exports.run = async (client, message, args, params) => {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
    if (!user) return message.channel.send("Please provide a user to check if the have voted");
  
    await ibl.checkUserVoted(`${user.id}`, function(data) {

    let embed = new MessageEmbed()
      .setTitle('Info and Statistics')
      .setColor(Colors.Primary)
      .setThumbnail(Images.Animated)
      .setImage(Images.Banner)
      .setDescription(`${data.hasVoted}`)
      .setTimestamp()
      .setFooter(Embeds.Footer, Images.Animated)

      return message.channel.send(embed)
  })
}

module.exports.help = {
    name: 'has-voted',
    category: 'owner',
    aliases: ['cv', 'check-voted'],
    description: 'Check if a User has Voted for Tox Mod on IBL',
    example: '``has-voted``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['SEND_MESSAGES', 'EMBED_LINKS'],
    ownerOnly: true,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

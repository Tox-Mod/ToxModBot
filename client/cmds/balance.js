const { MessageEmbed } = require('discord.js');
const SERVERS = require('@Database/servers');
const bal = require("@Database/economy/balance")
const moment = require('moment');
const fetch = require('node-fetch');
const package = require('../../package.json')

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

    const errorEmbed = new MessageEmbed()
       .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png'}))
       .setColor(Colors.Error)
       .setTimestamp()
    
    const successEmbed = new MessageEmbed()
       .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png'}))
       .setColor(Colors.Success)
       .setTimestamp()

    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

    let amountOfMoney


    await bal.findOne({ user: user.user.id }, async (err, db) => {
      if(!db) {
        new bal({
          user: user.id,
          balance: 0
        })
        .save()
        .catch(err => { return message.channel.send(`I have encountered an error -> ${err}`)})
        amountOfMoney = 0
      } else {
        amountOfMoney = db.balance
      }

      return message.channel.send(
        successEmbed.setTitle(`${user.user.username}s Balance`)
        .addField('💵 Balance' `$` + `${amountOfMoney}`, true)
        .addField('💰 Bank', `$` + `0.00`, true)
     )
  })
}

module.exports.help = {
    name: 'balance',
    category: 'economy',
    aliases: ['bal', 'bank', 'wallet'],
    description: 'Display how much Money a User has!',
    example: '``balance <@User> | balance``'
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

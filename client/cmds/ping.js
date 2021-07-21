const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');
const CLOCK = require('@Database/clock');
const moment = require('moment')

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');
const { response } = require('express');

module.exports.run = async (client, message, args, params) => {

    try {

        let embed = new MessageEmbed()
         .setTitle('Tox Mod Ping')
         .setColor(Colors.Primary)
         .setDescription(`🏓 Pong! , It took ${client.ws.ping}ms`)
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

         return message.channel.send(embed)

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
    name: 'ping',
    category: 'info',
    aliases: ['latency'],
    description: 'Check the Tox Mod Latency and Ping',
    example: '``ping``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
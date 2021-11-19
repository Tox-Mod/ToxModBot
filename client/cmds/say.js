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

module.exports.run = async (client, message, args) => {

    try {

         let NoMsg = new MessageEmbed()
         .setTitle('What would you like me to say?')
         .setColor(Colors.Error)
         .setDescription('Please define a message to send!')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

         if (!args[0]) return message.channel.send(NoMsg);

         let argsResult = args.slice(0).join(' ');

         message.delete()

         return message.channel.send(argsResult)

 
    } catch (err) {

        let ErrorEmbed = new MessageEmbed()
         .setTitle('Internal Error | Hmmm')
         .setColor(Colors.Error)
         .setDescription('Something went wrong here, Please try again or Contact my Dev Team.')
         .addField('Error', `${err}`)
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

         console.log(err)

        return message.channel.send(ErrorEmbed);

    }
}

module.exports.help = {
    name: 'say',
    category: 'chat',
    aliases: ['new', 'msg'],
    description: 'Send a message to a specific channel using the bot!',
    example: '``say [#Channel] <Message>``'
}

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: [],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

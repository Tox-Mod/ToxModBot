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

        let NoChan = new MessageEmbed()
         .setTitle('Woah, Think about it!')
         .setColor(Colors.Error)
         .setDescription('Please define a Channel to send the Message to.')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

         if (!args[0]) return message.channel.send(NoChan);

         let NoMsg = new MessageEmbed()
         .setTitle('What would you like me to say?')
         .setColor(Colors.Error)
         .setDescription('Please define a message to send!')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

         if (!args[1]) return message.channel.send(NoMsg);

         let argsResult;

         let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

         let InvalidChan = new MessageEmbed()
          .setTitle('Woah, Try again chief!')
          .setColor(Colors.Error)
          .setDescription('Unknown channel, Please mention the Channel or provide a valid Channel ID')
          .setTimestamp()
          .setFooter(Embeds.Footer, Images.Animated)

         if (!Channel) return message.channel.send(InvalidChan);

         message.delete()

         if (Channel) {
             agrsResult = args.slice(1).join(" ");      
             Channel.send(`${argsResult}`);
         } else {
             argsResult = args.slice(1).join(" ");
             message.channel.send(`${argsResult}`);
         }
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

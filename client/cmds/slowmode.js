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

        let time = 0;

        if(args[0].endsWith("s")){
            time = args[0].split("s")[0] * 1
        }else if(args[0].endsWith("m")){
            time = args[0].split("m")[0] * 60
        }else if(args[0].endsWith("h")){
            if(args[0].split("h")[0] > 6){

                let InvalidTime = new MessageEmbed()
                 .setTitle("❌ Hmm, That's not right")
                 .setColor(Colors.Error)
                 .setDescription("Slowmode can't be more then 6 Hours!")
                 .setTimestamp()
                 .setFooter(Embeds.Footer, Images.Animated)

                return message.channel.send(InvalidTime);
        }

        time = args[0].split('h')[0] * 3600
    
    } else {

        let InvalidUsage = new MessageEmbed()
         .setTitle("❌ You done goofed!")
         .setColor(Colors.Error)
         .setDescription("Wrong usage. Try: ``slowmode 5s``")
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        return message.channel.send(InvalidUsage)
     }

     let channelArgs = args.slice(1).join(" ");

     let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(channelArgs) || message.guild.channels.cache.find(ch => ch.name === channelArgs);

     if (!Channel) {
         Channel = message.channel
     }

     Channel.setRateLimitPerUser(time);

     let SuccessMsg = new MessageEmbed()
      .setTitle("⏳ Slowmode Time Updated")
      .setColor(Colors.Primary)
      .setDescription(`Okay i have updated the Slowmode for ${Channel.name}`)
      .addField('Slowmode', `${args[0]} Per message`, true)
      .setTimestamp()
      .setFooter(Embeds.Footer, Images.Animated)

     message.channel.send(SuccessMsg);

     SERVERS.findOne({ guildID: message.guild.id }, (err, res) => {

        let Channel1 = message.guild.channels.cache.get(res.mod);

        if (Channel1) {

            let SuccessLog = new MessageEmbed()
            .setTitle("⏳ Action: Channel Update")
            .setColor(Colors.Primary)
            .setDescription(`Slowmode has been Added/Updated for ${Channel.name}`)
            .addField('Slowmode', `${args[0]} Per message`, true)
            .addField('Moderator', `${message.author.tag}`, true)
            .setTimestamp()
            .setFooter(Embeds.Footer, Images.Animated)

            Channel1.send()
        }
     })

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
    name: 'slowmode',
    category: 'mod',
    aliases: ['sm'],
    description: 'Put a channel under Slowmode',
    example: '``slowmode <time(m, s, h)> [#channel]``'
}

module.exports.requirements = {
    userPerms: ["MANAGE_CHANNELS"],
    clientPerms: ["MANAGE_CHANNELS"],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
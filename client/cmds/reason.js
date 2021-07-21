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

        let NoCaseNumber = new MessageEmbed()
         .setTitle('Hmm, Whats the case?')
         .setColor(Colors.Error)
         .setDescription('Please define a Case Number to edit.')
         .addField('Usage Example', ```reason <CaseNumber> <NewReason>```, true)
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        if (!args[0]) return message.channel.send(NoCaseNumber);

        let NoCaseReason = new MessageEmbed()
         .setTitle('Hmm, Whats the reason?')
         .setColor(Colors.Error)
         .setDescription('Please define a new Reason')
         .addField('Usage Example', ```reason <CaseNumber> <NewReason>```, true)
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

         if (!args[1]) return message.channel.send(NoCaseReason);

         CASES.findOne({ serverID: message.guild.id, case: args[0] }, (err, res) => {

            let NoCaseInDB = new MessageEmbed()
             .setTitle('Error: No Case Found')
             .setColor(Colors.Error)
             .setDescription('Unable to find that Case')
             .setTimestamp()
             .setFooter(Embeds.Footer, Images.Animated)

            if (!res) return message.channel.send(NoCaseInDB);

            let reason;

            let newReason = args.slice(1).join(" ");

            if (res.reason == '') {
                reason = 'No reason provided!'
            } else {
                reason = res.reason
            }

            let CaseEmbed = new MessageEmbed()
             CaseEmbed.setTitle(`Case: ${args[0]}`)
             CaseEmbed.setColor(Colors.Primary)
             CaseEmbed.setThumbnail(message.guild.iconURL({ dynamic: true }))
             CaseEmbed.setDescription('Case reason has been updated!')
             CaseEmbed.addField('Old Reason', `${reason}`, true)
              res.reason = newReason
              res.save();
             CaseEmbed.addField('New Reason', `${res.reason}`, true)
             CaseEmbed.setTimestamp()
             CaseEmbed.setFooter(Embeds.Footer, Images.Animated) 

             message.channel.send(CaseEmbed);

             SERVERS.findOne({ guildID: message.guild.id }, (err, response) => {

                let logChan = message.guild.channels.cache.get(res.mod);

                if (channel) { 

                    let LogEmbed = new MessageEmbed()
                     .setTitle(`Case Reason Updated`)
                     .setColor(Colors.Primary)
                     .setThumbnail(message.guild.iconURL({ dynamic: true }))
                     .addField('Old Reason', `${reason}`, true)
                     .addField('New Reason', `${res.reason}`, true)
                     .addField('Moderator', `${message.author.tag}`, true)
                     .setTimestamp()
                     .setFooter(Embeds.Footer, Images.Animated) 

                    channel.send(LogEmbed);
                }
             })
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
    name: 'reason',
    category: 'mod',
    aliases: ['changereason', 'creason', 'cr'],
    description: 'Change the Reason for an Old Case',
    example: '``reason <CaseNumber> <NewReason>``'
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
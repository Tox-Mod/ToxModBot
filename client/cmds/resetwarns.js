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

        let userToFetch = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        let NoUser = new MessageEmbed()
         .setTitle('Umm, Nope. Try again!')
         .setColor(Colors.Error)
         .setDescription('Seems like i was unable to find that user!')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        if (!userToFetch) return message.channel.send(NoUser)

        let BotCheck = new MessageEmbed()
         .setTitle('Why would you even try that!')
         .setColor(Colors.Error)
         .setDescription("You can't even warn a bot why would you be able to clear/reset something that doesn't exist to begin with!")
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        if (userToFetch.user.bot) return message.channel.send(BotCheck)

        let InvalidPerms = new MessageEmbed()
         .setTitle('Lol, no way noob!')
         .setColor(Colors.Error)
         .setDescription("You can't Reset Warns for users with Higher Roles/Permissions then you!")
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        if (userToFetch.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(InvalidPerms)

        CASES.find({
            serverID: message.guild.id,
            action: "Warn",
            userID: userToFetch.user.id
        }, (err, res) => {

            res.forEach(warns => {
                warns.deleteOne();
            })

            let SuccessMsg = new MessageEmbed()
             .setTitle('✅ Action: Reset Warns!')
             .setColor(Colors.Primary)
             .setDescription(`Successfully reset warnings for ${userToFetch.user.tag}`)
             .setTimestamp()
             .setFooter(Embeds.Footer, Images.Animated)

            message.channel.send(SuccessMsg);

            SERVERS.findOne({ guildID: message.guild.id }, (err, response) => {

                let logChan = message.guild.channels.cache.get(response.mod);

                if (logChan) {

                    let LogMessage = new MessageEmbed()
                     .setTitle('✅ Action: Reset Warns!')
                     .setColor(Colors.Primary)
                     .setDescription(`Successfully reset warnings for ${userToFetch.user.tag}`)
                     .addField('Moderator', `${message.author.tag}`, true)
                     .setTimestamp()
                     .setFooter(Embeds.Footer, Images.Animated)

                    logChan.send(LogMessage);
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
    name: 'resetwarns',
    category: 'mod',
    aliases: ['rwarns', 'clearwarns', 'cwarns'],
    description: 'Reset the Warnings for a Member of the Server.',
    example: '``resetwarns <@User>``'
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
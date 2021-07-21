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

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        let BadUserPerms = new MessageEmbed()
         .setTitle('Woah, No way noob!')
         .setColor(Colors.Error)
         .setDescription("You can't remove roles from a member with higher roles then you!")
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(BadUserPerms)

        let InvalidUser = new MessageEmbed()
         .setTitle('Hmm, You sure about that?')
         .setColor(Colors.Error)
         .setDescription("Seems like i can't find that User, Are you sure they are a member?")
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)
        
        if (!member) return message.channel.send(InvalidUser)

        else {

            let role = args.slice(1).join(" ");

            let check = message.guild.roles.cache.find(r => r.name === role) || message.guild.roles.cache.get(role) || message.mentions.roles.first()

            let RoleError = new MessageEmbed()
             .setTitle('Hmm, You sure about that?')
             .setColor(Colors.Error)
             .setDescription("Umm, That user doesnt have the Role provided!")
             .setTimestamp()
             .setFooter(Embeds.Footer, Images.Animated)

            if (!member.roles.cache.get(check.id)) return message.channel.send(RoleError);

            if (!check) {

                let NoRoleFound = new MessageEmbed()
                 .setTitle("Woah, That's not right")
                 .setColor(Colors.Error)
                 .setDescription("Unable to find the provided Role!")
                 .setTimestamp()
                 .setFooter(Embeds.Footer, Images.Animated)

                return message.channel.send(NoRoleFound)

            } else {

                let InvalidBotPerms = new MessageEmbed()
                 .setTitle("Woah, Can't do that!")
                 .setColor(Colors.Error)
                 .setDescription("Sorry that Role is higher then me in the Hierarchy!")
                 .setTimestamp()
                 .setFooter(Embeds.Footer, Images.Animated)

                if (check.position >= message.guild.me.roles.highest.position) return message.channel.send(InvalidBotPerms)

                member.roles.remove(check);

                let RoleRemoved = new MessageEmbed()
                 .setTitle("Okay, Done that!")
                 .setColor(Colors.Primary)
                 .setDescription(`${check.name} has been removed from ${member.user.tag}`)
                 .setTimestamp()
                 .setFooter(Embeds.Footer, Images.Animated)

                message.channel.send(RoleRemoved)

                SERVERS.findOne({ guildID: message.guild.id }, (err, res) => {

                    let channel = message.guild.channels.cache.get(res.mod);

                    if (channel) {

                        let RoleLog = new MessageEmbed()
                         .setTitle("Action: Update Roles")
                         .setColor(Colors.Primary)
                         .addField('Moderator', `${message.author.tag}`, true)
                         .addField('User', `${member.user.tag}`, true)
                         .addField('Role', `${check.name}`, true)
                         .setTimestamp()
                         .setFooter(Embeds.Footer, Images.Animated)

                        channel.send(RoleLog);
                    }
                })
            }
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
    name: 'removerole',
    category: 'mod',
    aliases: ['rrole', 'rr'],
    description: 'Remove roles from the Specified User',
    example: '``removerole <@User> <@Role>``'
}

module.exports.requirements = {
    userPerms: ['MANAGE_ROLES'],
    clientPerms: ['MANAGE_ROLES'],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
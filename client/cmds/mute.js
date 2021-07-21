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

        let NoUserError = new MessageEmbed()
         .setTitle('Hmm, You forgot something!')
         .setColor(Colors.Error)
         .setDescription('Please provide a user to Mute!')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        if (!args[0]) return message.channel.send(NoUserError)

        SERVERS.findOne({ guildID: message.guild.id }, (err, res) => {

            let NoMutedRole = new MessageEmbed()
             .setTitle('Woah, Hang on a sec!')
             .setColor(Colors.Error)
             .setDescription(`You should configure a Muted Role in the [Dashboard](https://toxmod.xyz/dashboard)`)
             .addField('Guild Dashboard', `[Click Me](https://toxmod.xyz/dashboard/guilds/${message.guild.id})`, true)
             .addField('Set Guild Roles', `[Click Me](https://toxmod.xyz/dashboard/roles/${message.guild.id})`, true)
             .addField('Documentation', `[Click Me](https://docs.toxmod.xyz)`, true)
             .setTimestamp()
             .setFooter(Embeds.Footer, Images.Animated)

            if (res.mutedrole === "String") return message.channel.send(NoMutedRole);

            let UndefinedMutedRole = new MessageEmbed()
             .setTitle('Hmm, Somethings wrong chief!')
             .setColor(Colors.Error)
             .setDescription(`I couldnt find the Muted Role you can re-onfigure one in the [Dashboard](https://toxmod.xyz/dashboard)`)
             .addField('Guild Dashboard', `[Click Me](https://toxmod.xyz/dashboard/guilds/${message.guild.id})`, true)
             .addField('Set Guild Roles', `[Click Me](https://toxmod.xyz/dashboard/roles/${message.guild.id})`, true)
             .addField('Documentation', `[Click Me](https://docs.toxmod.xyz)`, true)
             .setTimestamp()
             .setFooter(Embeds.Footer, Images.Animated)

            if (!message.guild.roles.cache.get(res.mutedrole)) return message.channel.send(UndefinedMutedRole);

            let memberToMute = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            let NoUserDefined = new MessageEmbed()
             .setTitle('Bruh, Are you good?')
             .setColor(Colors.Error)
             .setDescription("I can't find a user to mute, Please mention someone or provide a valid User ID")
             .setTimestamp()
             .setFooter(Embeds.Footer, Images.Animated)

            if (!memberToMute) return message.channel.send(NoUserDefined);

            CLOCK.findOne({
                userID: userToMute.user.id,
                action: "Mute",
                serverID: message.guild.id
            }, (err, resp) => {

                let AlreadyMuted = new MessageEmbed()
                 .setTitle('How can i do that?')
                 .setColor(Colors.Error)
                 .setDescription('User has already been Muted!')
                 .setTimestamp()
                 .setFooter(Embeds.Footer, Images.Animated)

                if (resp) return message.channel.send(AlreadyMuted)

                else {

                    if (userToMute.roles.highest.position >= message.member.roles.highest.position) {

                        let InvalidPerms = new MessageEmbed()
                         .setTitle('Okay, Tryhard!')
                         .setColor(Colors.Error)
                         .setDescription("You can't Mute someone who is Higher then or Equal to your role Position.")
                         .setTimestamp()
                         .setFooter(Embeds.Footer, Images.Animated)

                        return message.channel.send(InvalidPerms);
                    }

                    let reason = agrs.slice(1).join(" ");

                    if (!reason) reason = 'No reason provided.'

                    let role1 = message.guild.roles.cache.get(res.mutedrole);

                    let InvalidBotPerms = new MessageEmbed()
                     .setTitle("No, Just No!")
                     .setColor(Colors.Error)
                     .setDescription("Muted role is Higher then my Highest Role!")
                     .setTimestamp()
                     .setFooter(Embeds.Footer, Images.Animated)

                    if (role1.position >= message.guild.me.roles.highest.postion) return message.channel.send(InvalidBotPerms)

                    let Done = new MessageEmbed()
                     .setTitle("Okay, Muted that hoe!")
                     .setColor(Colors.Primary)
                     .setDescription(`${userToMute.user.tag} has been muted`)
                     .addField('Reason', `${reason}`, true)
                     .setTimestamp()
                     .setFooter(Embeds.Footer, Images.Animated)

                    userToMute.roles.add(role1).catch(console.error().then(message.channel.send(Done)));

                    let newAction = new CLOCK({
                        userID: userToMute.user.id,
                        time: 00000,
                        timenow: 00000,
                        action: "Mute",
                        serverID: message.guild.id
                    })

                    newAction.save();

                    SERVERS.findOne({ guildID: message.guild.id }, (err, response) => {

                        let logChan = message.guild.channels.cache.get(response.mod);

                        if (logChan) {

                            let MuteLog = new MessageEmbed()
                             .setTitle('🔇 Action: Mute')
                             .setColor(Colors.Primary)
                             .setDescription(`${userToMute.user.tag} has been muted`)
                             .addField('Moderator', `${message.author.tag}`, true)
                             .addField('Reason', `${reason}`, true)
                             .setTimestamp()
                             .setFooter(Embeds.Footer, Images.Animated)

                            logChan.send()
                        }
                    })

                    CASES.find({ serverID: message.guild.id }).sort([['descending']]).exec((err, response1) => {

                        let userCases = new CASES({
                            userID: userToMute.user.id,
                            reason: reason,
                            action: "Mute",
                            Moderator: message.author.id,
                            serverID: message.guild.id,
                            time: moment(message.createdAt).format('MM/DD/YYYY HH:mm:ss A'),
                            case: response1.length + 1
                        })

                        userCases.save();

                        let UserEmbed = new MessageEmbed()
                         .setTitle(`🔇 Action: Mute | Case: #${response1.length}`)
                         .setColor(Colors.Primary)
                         .setThumbnail(message.guild.iconURL({ dynamic: true }))
                         .setDescription('You have been Muted!')
                         .addField('Moderator', `${message.author.tag}`, true)
                         .addField('Reason', `${reason}`, true)
                         .addField('Guild', `${message.guild.name}`, true)
                         .setTimestamp()
                         .setFooter(Embeds.Footer, Images.Animated)

                         userToMute.send(UserEmbed).catch(() => {});
                    })
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
    name: 'mute',
    category: 'mod',
    aliases: ['shh', 'silence'],
    description: 'Mute a Member of the Server',
    example: '``mute <@User> [reason]``'
}

module.exports.requirements = {
    userPerms: ["KICK_MEMBERS"],
    clientPerms: ["MANAGE_ROLES"],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
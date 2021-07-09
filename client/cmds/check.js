const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

    let InvalidArgs = new MessageEmbed()
      .setTitle('Error | Invalid Usage')
      .setColor(Colors.Error)
      .setDescription('Please provide a valid User Mention or ID')
      .addField('Example', 'check <user_id> | check <@User>', true)
      .setTimestamp()
      .setFooter(Embeds.Footer, Images.Animated)

    if (!args[0]) return message.channel.send(InvalidArgs);

    let UserToCheck = args.slice(0).join(' ');

    const GuildMember = message.mentions.users.first() || client.users.cache.get(UserToCheck) || client.users.cache.find(u => u.username === UserToCheck);

    if (!GuildMember) GuildMember = message.author;

    CASES.findOne({
        serverID: message.guild.id,
        userID: GuildMember.id }, (err, res) => {

        CASES.find({
            serverID: message.guild.id,
            userID: GuildMember.id }, (err, Numbers) => {

                CASES.find({
                    serverID: nessage.guild.id,
                    action: 'Ban',
                    userID: GuildMember.id }, (err, ban) => {

                        CASES.find({
                            serverID: message.guild.id,
                            action: 'SoftBan',
                            userID: GuildMember.id }, (err, soft) => {

                                CASES.find({
                                    serverID: message.guild.id,
                                    action: 'Kick',
                                    userID: GuildMember.id }, (err, kick) => {

                                        CASES.find({
                                            serverID: message.guild.id,
                                            action: 'Warn',
                                            userID: GuildMember.id }, (err, warns) => {

                                                CASES.find({
                                                    serverID: message.guild.id,
                                                    action: 'Mute',
                                                    userID: GuildMember.id }, (err, mute) => {

                                                        CASES.find({
                                                            serverID: message.guild.id,
                                                            action: 'Unmute',
                                                            userID: GuildMember.id }, (err, unmute) => {

                                                                CASES.find({
                                                                    serverID: message.guild.id,
                                                                    action: 'HackBan',
                                                                    userID: GuildMember.id }, (err, hackban) => {

                                                                        CASES.find({
                                                                            serverID: message.guild.id,
                                                                            action: 'UnBan',
                                                                            userID: GuildMember.id }, (err, unban) => {

                                                                                CASES.find({
                                                                                    serverID: message.guild.id,
                                                                                    action: 'TempMute',
                                                                                    userID: GuildMember.id }, (err, tmute) => {

                                                                                        CASES.find({
                                                                                            serverID: message.guild.id,
                                                                                            action: 'TempBan',
                                                                                            userID: GuildMember.id }, (err, tban) => {

                                                                                                if (!res) {
                                                                                                    
                                                                                                    let NoCasesFound = new MessageEmbed()
                                                                                                      .setTitle('Error | No Cases Found')
                                                                                                      .setColor(Color.Error)
                                                                                                      .setDescription('That user has no open Infractions/Cases in this Server.')
                                                                                                      .setTimestamp()
                                                                                                      .setFooter(Embeds.Footer, Images.Animated)

                                                                                                    return message.channel.send(NoCasesFound)
                                                                                                }

                                                                                                let UserCases = '';

                                                                                                for (i = 0; i < Numbers.length; i++) {

                                                                                                    UserCases += `**${Numbers[i].case}** ,`
                                                                                                }

                                                                                                let UserWarns = '';
                                                                                                let UserKicks = '';
                                                                                                let UserBans = '';
                                                                                                let UserMutes = '';
                                                                                                let UserUnmutes = '';
                                                                                                let UserSoftBans = '';
                                                                                                let UserHackBans = '';
                                                                                                let UserUnbans = '';
                                                                                                let UserTempMutes = '';
                                                                                                let UserTempBans = '';

                                                                                                if (!warns) {

                                                                                                    UserWarns = '0'
                                                                                                } else {

                                                                                                    UserWarns = warns.length
                                                                                                }

                                                                                                if (!mute) {

                                                                                                    UserMutes = '0'
                                                                                                } else {

                                                                                                    UserMutes = mute.length
                                                                                                }

                                                                                                if (!kick) {

                                                                                                    UserKicks = '0'
                                                                                                } else {

                                                                                                    UserKicks = kick.length
                                                                                                }

                                                                                                if (!ban) {

                                                                                                    UserBans = '0'
                                                                                                } else {

                                                                                                    UserBans = ban.length
                                                                                                }

                                                                                                if (!unmute) {

                                                                                                    UserUnmutes = '0'
                                                                                                } else {

                                                                                                    UserUnmutes = unmute.length
                                                                                                }

                                                                                                if (!soft) {

                                                                                                    UserSoftBans = '0'
                                                                                                } else {

                                                                                                    UserSoftBans = soft.length
                                                                                                }

                                                                                                if (!hackban) {

                                                                                                    UserHackBans = '0'
                                                                                                } else {

                                                                                                    UserHackBans = hackban.length
                                                                                                }

                                                                                                if (!unban) {

                                                                                                    UserUnbans = '0'
                                                                                                } else {

                                                                                                    UserUnbans = unban.length
                                                                                                }

                                                                                                if (!tmute) {

                                                                                                    UserTempMutes = '0'
                                                                                                } else {

                                                                                                    UserTempMutes = tmute.length
                                                                                                }

                                                                                                if (!tban) {

                                                                                                    UserTempBans = '0'
                                                                                                } else {

                                                                                                    UserTempBans = tban.length
                                                                                                }

                                                                                                client.users.fetch(res.userID).then(CaseMember => {

                                                                                                    let CaseCheckMsg = new MessageEmbed()
                                                                                                      .setTitle('Action: Case Check')
                                                                                                      .setColor(Colors.Primary)
                                                                                                      .setThumbnail(CaseMember.displayAvatarURL({ dynamic: true }))
                                                                                                      .setDescription(`Here is a list of cases for ${CaseMember.username}`)
                                                                                                      .addField('Kick(s)', `${UserKicks}`, true)
                                                                                                      .addField('Ban(s)', `${UserBans}`, true)
                                                                                                      .addField('Soft Ban(s)', `${UserSoftBans}`, true)
                                                                                                      .addField('Warning(s)', `${UserWarns}`, true)
                                                                                                      .addField('Mute(s)', `${UserMutes}`, true)
                                                                                                      .addField('UnMute(s)', `${UserUnmutes}`, true)
                                                                                                      .addField('Hack Ban(s)', `${UserHackBans}`, true)
                                                                                                      .addField('Temp Mute(s)', `${UserTempMutes}`, true)
                                                                                                      .addField('Temp Ban(s)', `${UserTempBans}`, true)
                                                                                                      .addField('All Cases', `${UserCases}`, true)
                                                                                                      .addField('View Case', 'tox.case <CaseNumber>', true)
                                                                                                      .setTimestamp()
                                                                                                      .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

                                                                                                      return message.channel.send(CaseCheckMsg);
                                                                                                })
                                                                                            })
                                                                                    })
                                                                            })
                                                                    })
                                                            })
                                                    })
                                            })
                                    })
                            })
                    })
            })
    })
}

module.exports.help = {
    name: 'check',
    category: 'info',
    aliases: [],
    description: 'Check a User and a list of their Cases/Infractions',
    example: '``check <@User>``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['EMBED_LINKS', 'SEND_MESSAGES'],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
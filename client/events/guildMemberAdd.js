const SERVERS = require('@Database/servers');
const MUTED = require('@Database/clock');
const { MessageEmbed, Message } = require('discord.js');
const moment = require('moment')

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = async (client, member) => {

    if (member.guild) {

        SERVERS.findOne({ guildID: member.guild.id }, async (err, res) => {

            if (!res) {

            } else {

                MUTED.findOne({ action: 'TempMute', serverID: member.guild.id, userID: member.user.id }, (err, mute) => {

                    if (mute) {

                        if (!member.guild.roles.cache.get(res.mutedrole)) return;

                        let role = member.guild.roles.cache.get(res.mutedrole)

                        member.roles.add(role);
                    }
                })

                MUTED.findOne({ action: 'Mute', serverID: member.guild.id, userID: member.user.id }, (err, mute) => {

                    if (mute) {

                        if (!member.guild.roles.cache.get(res.mutedrole)) return;

                        let role = member.guild.roles.cache.get(res.mutedrole)

                        member.roles.add(role)
                    }
                })
            }

            if (res) {

                if (res.antiraid == "1") {

                    let AntiRaidEmbed = new MessageEmbed()
                      .setTitle('Sorry, Guild Lockdown Enabled')
                      .setColor(Colors.Error)
                      .setThumbnail(member.guild.iconURL({ dynamic: true }))
                      .setDescription('Hey there, This Guild has enabled my Lockdown/Anti-Raid Mode and is no longer allowing new members to join. Please try again later!')
                      .addField('Guild Name', `${member.guild.name}`, true)
                      .addField('Guild ID', `${member.guild.id}`, true)
                      .setTimestamp()
                      .setFooter(Embeds.Footer, Images.Animated)

                    member.send(AntiRaidEmbed)
                    .catch(() => { member.kick('Anti-Raid Enabled') })
                    .then(() => { member.kick('Anti-Raid Enabled') })
                    return;
                }
            }

            if (res.welcome !== "String") {
                
                if (!client.guilds.cache.get(member.guild.id).channels.cache.get(res.welcome)) return;

                if (res.welcomemsg == "String") {

                    if (!client.guilds.cache.get(member.guild.id).channels.cache.get(res.welcome)) return;

                    let defaultMessages = [
                        `**Welcome ${member} to ${member.guild.name}**`,
                        `**Welcome ${member} to ${member.guild.name}**`,
                        `**Welcome ${member} to ${member.guild.name}**`,
                        `**Welcome ${member} to ${member.guild.name}** 🎉`,
                        `**${member} just arrived at ${member.guild.name}**`,
                        `**Let's welcome ${member}** 🎉`,
                        `**Welcome ${member} i really hope you don't leave us**`,
                        `**${member} hola ! 🎉**`,
                        `**${member} you are member number ${member.guild.memberCount}** 🎉`,
                        `**Superman is here ${member}** 🎉`,
                        `**${member} thanks for joining** 🎉`,
                        `**${member.guild} now is your place to party ${member}** 🎉`,
                        `**This guild is lucky because they have ${member}**`,
                        `**Welcome ${member} do you want some ice cream?** 🍦`,
                    ]

                    let displayMessage = messages[Math.ceil(Math.random() * messages.length)] || `**Welcome ${member} you are member number ${member.guild.memberCount}** 🎉`;

                    let WelcomeEmbed = new MessageEmbed()
                      .setTitle('A new User has Arrived! 🎉')
                      .setColor(Colors.Primary)
                      .setThumbnail(member.guild.iconURL({ dynamic: true }))
                      .setDescription(`${displayMessage}`)
                      .setTimestamp()
                      .setFooter(Embeds.Footer, member.guild.iconURL({ dynamic: true }))

                    client.guilds.cache.get(member.guild.id).channels.cache.get(res.welcome).send(WelcomeEmbed)
                
                } else {

                    if (!client.guilds.cache.get(member.guild.id).channels.cache.get(res.welcome)) return;

                    if (res.welcomemsg !== "String") {

                        if(!client.guilds.cache.get(member.guild.id).channels.cache.get(res.welcome)) return

                        let welcomemsg = res.welcomemsg

                        if (welcomemsg.includes('{member}')) {
                            welcomemsg = welcomemsg.replace('{member}', member)
                        } 

                        if (welcomemsg.includes('{member.tag}')) {
                            welcomemsg = welcomemsg.replace('{member.tag}', member.user.tag)
                        }

                        if (welcomemsg.includes('{guild.name}')) {
                            welcomemsg = welcomemsg.replace('{guild.name}', member.guild.name)
                        }

                        if (welcomemsg.includes('{guild.memberCount}')) {
                            welcomemsg = welcomemsg.replace('{guild.memberCount}', member.guild.memberCount)
                        }

                        if (welcomemsg.includes('{member.username}')) {
                            welcomemsg = welcomemsg.replace('{member.username}', member.user.username)
                        }

                        let WelcomeEmbed2 = new MessageEmbed()
                          .setTitle('A new User has Arrived! 🎉')
                          .setColor(Colors.Primary)
                          .setThumbnail(member.guild.iconURL({ dynamic: true }))
                          .setDescription(`${welcomemsg}`)
                          .setTimestamp()
                          .setFooter(Embeds.Footer, member.guild.iconURL({ dynamic: true }))
  
                       client.guilds.cache.get(member.guild.id).channels.cache.get(res.welcome).send(WelcomeEmbed2)
                    }
                }
            }

            if (res) {

                if (member.user.bot) {

                    if (res.botautorole !== "String") {

                        if (!client.guilds.cache.get(member.guild.id).roles.cache.get(res.botautorole)) return;

                        member.roles.add(res.botautorole)
                    }
                } else {

                    if (!member.user.bot) {

                        if (res.autorole !== "String") {

                            if (!client.guilds.cache.get(member.guild.id).roles.cache.get(res.autorole)) return;

                            member.roles.add(autorole)
                        }
                    }
                }

                if (res.private !== "String") {

                    if (res.private) {

                        let privatemsg = res.private

                        if(privatemsg.includes("{member}")){
                            privatemsg = privatemsg.replace("{member}", member)
                        }

                        if(privatemsg.includes("{member.tag}")){
                            privatemsg = privatemsg.replace("{member.tag}", member.user.tag)
                        }

                        if(privatemsg.includes("{guild.name}")){
                            privatemsg = privatemsg.replace("{guild.name}", member.guild.name)
                        }

                        if(privatemsg.includes("{guild.memberCount}")){
                            privatemsg = privatemsg.replace("{guild.memberCount}", member.guild.memberCount)
                        }

                        if(privatemsg.includes("{member.username}")){
                            privatemsg = privatemsg.replace("{member.username}", member.user.username)
                        }

                        let PrivateEmbed = new MessageEmbed()
                          .setTitle('Thanks for joining 🎉')
                          .setColor(Colors.Primary)
                          .setThumbnail(member.guild.iconURL({ dynamic: true }))
                          .setDescription(`${privatemsg}`)
                          .setTimestamp()
                          .setFooter(Embeds.Footer, member.guild.iconURL({ dynamic: true }))

                        member.send(PrivateEmbed).catch(() => {});
                    }
                }
            }
        })
    }
}
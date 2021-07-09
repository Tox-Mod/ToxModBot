const mongoose = require("mongoose")
const SERVERS = require("@Database/servers")
const ms = require('parse-ms');
const CLOCK = require("@Database/clock")
const { MessageEmbed } = require("discord.js");
const { mongo_url } = require("@Settings/config")
const ratetime = new Set()

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = async (client, message) => {

    if (message.author.bot) return;
    if (message.guild) {
        if (!message.guild.me.hasPermission('SEND_MESSAGES')) return;
    }

    await SERVERS.findOne({ guildID: message.guild.id }, async (err, res) => {

            let prefix = 'tox.'

            if (!res) {
                const NewServer = await new SERVERS({
                    antispam: '0',
                    maxwarns: '3',
                    guildID: message.guild.id,
                    mutedrole: 'String',
                    prefix: 'tox.',
                    welcome: 'greetings',
                    leave: 'greetings',
                    audit: 'String',
                    autorole: 'String',
                    antiraid: '0',
                    welcomemsg: 'String',
                    leavemsg: 'String',
                    private: 'String',
                    botautorole: 'String'
            });

            await NewServer.save();

            console.log(`[Tox Mod | Bot] Created a new table in the Database for Guild ID: ${message.guild.id}`);

            prefix = 'tox.'
        }
        /**
         * LINK SPAM DETECTION FILTER
         */
        {
            if (res) {
                if (res.antispam == 1) {
                    if (message.author.bot) return;

                    let blacklisted = ['www', 'http://', 'https://', 'DISCORDAPP.', 'DiscordApp.', 'discordapp.', '.xyz', '.com', '.gg', '.co'];

                    let foundInText = false;

                    for (var i in blacklisted) {

                        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
                    }

                    if (foundInText) {

                        if (message.member.hasPermission('MANAGE_MESSAGES')) return;

                        message.delete();

                        let embed = new MessageEmbed()
                          .setTitle('Spam Detection | Link(s)')
                          .setColor(Colors.Error)
                          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                          .setDescription(`${message.author} Hey kid, Cut that out before i Ban you from the Guild.`)
                          .setTimestamp()
                          .setFooter(Embeds.Footer, Images.Animated)

                        return message.channel.send(embed).then(msg => {
                            msg.delete({ timeout: 3000 });
                        })
                    }
                }
            }
        }
        /**
         * BAD WORD DETECTION FILTER
         */
        {
            if (res) {
                if (res.antispam == 1) {
                    if (message.author.bot) return;

                    let blacklisted1 = ['ASS','ass','Ass',"fuck","Fuck","shit","Shit","bitch","Bitch","nigga","Nigga","gay","Gay","dick","Dick","pussy","Pussy"];

                    let foundInText2 = false;

                    for (var i in blacklisted1) {

                        if (message.content.toLowerCase().includes(blacklisted1[i].toLowerCase())) foundInText2 = true;
                    }

                    if (foundInText2) {

                        if (message.member.hasPermission('MANAGE_MESSAGES')) return;

                        message.delete();

                        let embed2 = new MessageEmbed()
                          .setTitle('Auto-Mod Filter | Bad Words')
                          .setColor(Colors.Error)
                          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                          .setDescription(`${message.author} Do you think you are cool or something?`)
                          .setTimestamp()
                          .setFooter(Embeds.Footer, Images.Animated)

                        return message.channel.send(embed2).then(msg => {
                            msg.delete({ timeout: 3000 });
                        })
                    }
                }
            }
        }

        /**
         * TEMP BAN INTERVAL SETUP
         */
        setInterval(() => {

            CLOCK.find({
                action: 'TempBan',
                serverID: message.guild.id
            }, (err, res1) => {
                if (res1.length === 0) return;

                res1.map(BannedUser => {
                    client.users.fetch(BannedUser.userID).then(async user => {

                        const GuildBans = await message.guild.fetchBans();

                        if (!GuildBans.has(user.id)) return BannedUser.deleteOne()
                    });

                    if (BannedUser.time - (Date.now() - BannedUser.timeout) < 0) {

                        if(BannedUser.userID) {

                            client.users.fetch(BannedUser.userID).then(async BannedMember => {

                                const GuildBans = await message.guild.fetchBans();

                                if (!GuildBans.has(BannedMember.id)) return BannedUser.deleteOne();

                                await message.guild.members.unban(BannedMember).catch(() => {})

                                BannedUser.deleteOne();

                                let TempBanExpired = new MessageEmbed()
                                  .setTitle(':white_check_mark: Temp Ban Expired')
                                  .setColor(Colors.Success)
                                  .setDescription(`Your Temporary Ban at ${message.guild.name} has expired.`)
                                  .setTimestamp()
                                  .setFooter(Embeds.Footer, Images.Animated)

                                BannedMember.send(TempBanExpired).catch(() => {});

                               if (res) {

                                let channel = message.guild.channels.cache.get(res.mod);

                                if (channel) {

                                    let TempBanLog = new MessageEmbed()
                                      .setTitle(':white_check_mark: Temp Ban Expired')
                                      .setColor(Colors.Success)
                                      .setDescription(`The Temp Ban for ${BannedMember.tag} has expired!`)
                                      .setTimestamp()
                                      .setFooter(Embeds.Footer, Images.Animated)

                                    channel.send(TempBanLog).catch(() => {});
                                }
                               }
                            })
                        }
                    }
                })
            })
        }, 60000);

        setInterval(() => {

            CLOCK.find({
                action: "TempMute",
                serverID: message.guild.id
            }, (err, res2) => {

                if (res2.length === 0) return;

                res2.map(user => {

                    client.users.fetch(user.userID).then(user2 => {

                        let user3 = message.guild.member(user2)

                        if (!user3.roles.cache.get(res.mutedrole)) return user.deleteOne();
                    })

                    if (user.time - (Date.now() - user.timenow) < 0) {

                        if (user.userID) {

                            client.users.fetch(user.userID).then(member => {

                                let EmbedFooter = 'Notified the User Successfully!!'

                                if (!message.guild.members.cache.get(member.id)) return user.deleteOne();

                                if (!message.guild.roles.cache.get(res.mutedrole)) return user.deleteOne();

                                let role = message.guild.roles.cache.get(res.mutedrole);

                                let MutedUser = message.guild.member(member);

                                if (!MutedUser.roles.cache.get(res.mutedrole)) return user.deleteOne();

                                MutedUser.roles.remove(role);

                                user.deleteOne();

                                let TempMuteExpired = new MessageEmbed()
                                  .setTitle(':white_check_mark: Temp Mute Expired')
                                  .setColor(Colors.Success)
                                  .setDescription(`Your Temp Mute at ${message.guild.name} has expired. You are free to talk!`)
                                  .setTimestamp()
                                  .setFooter(Embeds.Footer, Images.Animated)

                                member.send(TempMuteExpired).catch(() => {
                                    EmbedFooter = 'Failed to Notify the User!!'
                                });

                                if (res) {

                                    let channel = message.guild.channels.cache.get(res.mod);

                                    if (channel) {

                                        let TempMuteLog = new MessageEmbed()
                                          .setTitle(':white_check_mark: Temp Mute Expired')
                                          .setColor(Colors.Success)
                                          .setDescription(`The Temp Mute for ${member.tag} has expired. They are free to talk again!`)
                                          .setTimestamp()
                                          .setFooter(EmbedFooter, Images.Animated)

                                        channel.send(TempMuteLog).catch(() => {});
                                    }
                                }
                            })
                        }
                    } 
                })
            })
        }, 60000);

        setInterval(() => {

            CLOCK.find({
                action: 'Mute',
                serverID: message.guild.id
            }, (err, response) => {

                response.map(user => {

                    client.users.fetch(user.userID).then(user2 => {

                        let MutedUser = message.guild.member(user2);

                        if (!MutedUser.roles.cache.get(response.mutedrole)) return user.deleteOne();
                    })
                })
            })
        }, 60000);

        const args = message.content.split(/ +/g);
        const commands = args.shift().slice(prefix.length).toLowerCase();
        const cmd = client.commands.get(commands) || client.aliases.get(commands);

        if (!message.content.toLowerCase().startsWith(prefix)) return;

        let CmdNotFound = new MessageEmbed()
          .setTitle('Hmm, Are you sure?')
          .setColor(Colors.Error)
          .setDescription(`${cmd} Is not a valid command lolz`)
          .setTimestamp()
          .setFooter(Embeds.Footer, Images.Animated)

        if (!cmd) return message.channel.send(CmdNotFound);

        if (!message.channel.permissionsFor(message.guild.me).toArray().includes("SEND_MESSAGES")) return;

        let OwnerOnlyBoii = new MessageEmbed()
          .setTitle('Umm, You wish!!')
          .setColor(Colors.Error)
          .setDescription('Only the my Owners and Developers can Execute this Command')
          .setTimestamp()
          .setFooter(Embeds.Footer, Images.Animated)

        if (cmd.requirements.ownerOnly && !client.config.owners.includes(message.author.id)) return message.channel.send(OwnerOnlyBoii);

        let BetaOnlyBoii = new MessageEmbed()
          .setTitle('Yeah right bud!!')
          .setColor(Colors.Error)
          .setDescription('This Command is in Beta Mode and only the Beta Users have access!')
          .addField('Apply for Beta Access', `DM [Toxic Dev](https://discord.com/users/510065483693817867)`)
          .setTimestamp()
          .setFooter(Embeds.Footer, Images.Animated)

        if (cmd.requirements.betaMode && !client.config.beta.includes(message.author.id)) return message.channel.send(BetaOnlyBoii);

        let MaintenanceMode = new MessageEmbed()
         .setTitle('I cant do that right now!')
         .setColor(Colors.Error)
         .setDescription('This Command is Unavailable right now, Please try again later!')
         .addField('Possible Reasons', 'Bugs, Errors or Updates')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        if (cmd.requirements.devLock && !client.config.devs.includes(message.author.id)) return message.channel.send(MaintenanceMode);

        let embed = new MessageEmbed()
         .setAuthor("User Lacking Permissions ❌", message.author.displayAvatarURL({dynamic: true}))
         .addField(`Missing Permissions`, missingPerms(message.member, cmd.requirements.userPerms))
         .setFooter(Embeds.Footer, Images.Animated)
        
        if(cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms)) return message.channel.send(embed)
        
        let embed1 = new MessageEmbed()
         .setAuthor("Client Lacking Permissions ❌", client.user.displayAvatarURL({dynamic: true}))
         .addField(`Missing Permissions`, missingPerms(message.guild.me, cmd.requirements.clientPerms))
         .setFooter(Embeds.Footer, Images.Animated)
        
        if(cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.clientPerms)) return message.channel.send(embed1)

        if (cmd.limits) {

            const current = client.limits.get(`${commands}-${message.author.id}`);

            if (!current) client.limits.set(`${commands}-${message.author.id}`, 1);

            else {

                if (current >= cmd.limits.rateLimit) {

                    let timeout = ms(cmd.limits.cooldown - (Date.now() - ratetime[message.author.id + commands].times));

                    let CoolDown = new MessageEmbed()
                      .setTitle('Woah bud, Slowdown!')
                      .setColor(Colors.Error)
                      .setDescription('You are being Ratelimited, Please try again later!')
                      .addField('Time Remaining', `${timeout.hours}h ${timeout.minutes}m ${timeout.seconds}s`)
                      .setTimestamp()
                      .setFooter(Embeds.Footer, Images.Animated)

                    return message.channel.send(CoolDown);
                }

                client.limits.set(`${commands}-${message.author.id}`, current + 1);

                ratetime.add(message.author.id, commands);

                ratetime[message.author.id + commands] = {
                    times: Date.now()
                }
            }

            setTimeout(() => {

                client.limits.delete(`${commands}-${message.author.id}`);

                ratetime.delete(message.author.id + commands);
            }, cmd.limits.cooldown);
        }

        cmd.run(client, message, args)
    })
}

const missingPerms = (member, perms) => {

    const missingPerms = member.permissions.missing(perms).map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``)

    return missingPerms.length > 1 ? `${missingPerms.slice(0, -1).join(", ")} **,** ${missingPerms.slice(-1)[0]}` : missingPerms[0];
}
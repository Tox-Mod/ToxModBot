const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

    message.channel.send("Give me a minute to Check for or Create the Muted Role").then(msg => {

        let check1 = args.slice(0).join(" ") || "Muted";

        if (message.guild.roles.cache.find(r => r.name === check1)) return msg.edit(`${check1} Already exists here. You can reset it using ``tox.createmute [RoleName]```);

        message.guild.roles. create({
            data: {
                name: args.slice(0).join(" ") || "Muted",
                color: 'RANDOM',
            },
            reason: 'Member Requested a Mute Role Creation',
        }).then(role => {

            setTimeout(() => {
                msg.edit('Successfully created a Muted Role for you!')
            }, 3000)

            setTimeout(() => {
                msg.edit('Editing the Role Permissions')
                role.setPermissions(0)
            }, 6000)

            setTimeout(() => {
                msg.edit('Successfully set the Role Permissions to `0`')
            }, 9000)

            setTimeout(() => {
                msg.edit('Adding Role Permissions to Channel Overrides')
                message.guild.channels.cache.map(channel => {
                    channel.updateOverwrite(role.id, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        EMBED_LINKS: false,
                        ATTACH_FILES: false,
                        CONNECT: false
                    })
                })
            }, 13000)

            setTimeout(() => {
                msg.edit('Successfully added Channel Overrides for Muted role.\nNow i am Fixing any possible Bugs please wait')
                SERVERS.findOne({ guildID: message.guild.id }, async (err, res) => {
                    if (!res) {
                        const NewGuild = new SERVERS({
                            antispam: "0",
                            maxwarns: "3",
                            guildID: message.guild.id,
                            mutedrole: role.id,
                            prefix: "tox.",
                            welcome: "String",
                            leave: "String",
                            audit: "String",
                            autorole: "String",
                            antiraid: "0",
                            welcomemsg: "String",
                            leavemsg: "String",
                            private: "String",
                            botautorole: "String",
                        });

                        NewGuild.save();
                    } else {
                        res.mutedrole = role.id
                        await res.save()
                    }
                })
            }, 20000)

            setTimeout(() => {
                msg.edit('Successfully configured the role! Message will be Deleted in: `10 Seconds`')
            }, 27000)

            setTimeout(() => {
                msg.delete().catch(() => {})
            }, 37000)
        })

        .catch(() => {
            msg.edit('Error occured while creating the Muted Role. Please try again!')
            setTimeout(() => {
                return msg.delete().catch(() => {})
            }, 5000)
        })
    })
}

module.exports.help = {
    name: 'createmute',
    category: 'mod',
    aliases: ['cm', 'cmute'],
    description: 'Create a Muted Role for your Server!',
    example: '``createmute <RoleName>``'
}

module.exports.requirements = {
    userPerms: ['MANAGE_ROLES', 'MUTE_MEMBERS'],
    clientPerms: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
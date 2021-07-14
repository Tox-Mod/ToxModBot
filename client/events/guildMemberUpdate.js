const SERVERS = require('@Database/servers');
const { MessageEmbed, Message } = require('discord.js');
const moment = require('moment')

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = (client, oldMember, newMember) => {

    const guild = newMember.guild;

    if (guild) {

        SERVERS.findOne({ guildID: guild.id }, async (err, res) => {

            if (!res) {

            } else {

                if (res.audit == "String") {

                } else {

                    if (!client.guilds.cache.get(guild.id).channels.cache.get(res.audit)) return;

                    if (newMember.nickname !== oldMember.nickname) {

                        let oldNick = oldMember.nickname
                        let newNick = newMember.nickname

                        if (newNick == null) {
                            newNick = newMember.user.username
                        } else if (oldNick == null) {
                            oldNick = oldMember.user.username
                        }

                        let UpdateEmbed = new MessageEmbed()
                          .setTitle('Member Nickname Updated')
                          .setColor(Colors.Primary)
                          .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
                          .addField('New Nickname', `${newNick}`, true)
                          .addField('Old Nickname', `${oldNick}`, true)
                          .addField('User Created', `${moment(oldMember.user.createdAt).format('MM/DD/YYYY HH:mm:ss A')}`, true)
                          .setTimestamp()
                          .setFooter(Embeds.Footer, newMember.user.displayAvatarURL({ dynamic: true }))

                          client.guilds.cache.get(guild.id).channels.cache.get(res.audit).send(UpdateEmbed)
                    }
                }
            }
        })
    }
}
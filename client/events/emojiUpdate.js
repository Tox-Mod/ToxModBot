const moment = require('moment')
const SERVERS = require('@Database/servers');
const { MessageEmbed, Message } = require('discord.js');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = (client, oldEmoji, newEmoji) => {

    if (newEmoji.guild) {

        SERVERS.findOne({ guildID: newEmoji.guild.id }, (err, res) => {

            if (!res) {

                console.log(`[Tox Mod | Bot] Invalid Response on Emoji Updates for ${newEmoji.guild.name}. NOTE: This is not a Fatal Error and can be safely Ignored!`)

            } else {

                if (res.audit == "String") {

                    console.log(`[Tox Mod | Bot] No Audit Logs Channel Defined. NOTE: This is not a Fatal Error and can be safely Ignored!`)

                } else {

                    if (!client.guilds.cache.get(newEmoji.guild.id).channels.cache.get(res.audit)) return;

                    if (oldEmoji.name !== newEmoji.name) {

                    let EmojiUpdated = new MessageEmbed()
                      .setTitle('Action: Emoji Updated')
                      .setColor(Colors.Primary)
                      .setDescription('An Emoji has been Updated!')
                      .addField('Old Name', `${oldEmoji.name}`, true)
                      .addField('New Name', `${newEmoji.name}`, true)
                      .addField('Created On', `${moment(newEmoji.createdAt).format('MM/DD/YYYY HH:mm:ss A')}`, true)
                      .setTimestamp()
                      .setFooter(Embeds.Footer, Images.Animated)

                      client.guilds.cache.get(newEmoji.guild.id).channels.cache.get(res.audit).send(EmojiUpdated);
                    }
                }
            }
        })
    }
}
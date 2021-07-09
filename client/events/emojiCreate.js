const moment = require('moment')
const SERVERS = require('@Database/servers');
const { MessageEmbed, Message } = require('discord.js');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = (client, emoji) => {

    if (emoji.guild) {

        SERVERS.findOne({ guildID: emoji.guild.id }, (err, res) => {

            if (!res) {

                console.log(`[Tox Mod | Bot] Invalid Response on Emoji Updates for ${emoji.guild.name}. NOTE: This is not a Fatal Error and can be safely Ignored!`)

            } else {

                if (res.audit == "String") {

                    console.log(`[Tox Mod | Bot] No Audit Logs Channel Defined. NOTE: This is not a Fatal Error and can be safely Ignored!`)

                } else {

                    if (!client.guilds.cache.get(emoji.guild.id).channels.cache.get(res.audit)) return;

                    let NewEmoji = new MessageEmbed()
                      .setTitle('Action: Emoji Creation')
                      .setColor(Colors.Primary)
                      .setDescription('A new Emoji has been Created!')
                      .addField('Emoji', `${emoji.name} (${emoji})`, true)
                      .setTimestamp()
                      .setFooter(Embeds.Footer, Images.Animated)

                      client.guilds.cache.get(emoji.guild.id).channels.cache.get(res.audit).send(NewEmoji);
                }
            }
        })
    }
}
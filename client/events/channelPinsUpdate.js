const SERVERS = require('@Database/servers');
const { MessageEmbed, Message } = require('discord.js');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = (client, channel) => {

    if (channel.guild) {

        SERVERS.findOne({ guildID: channel.guild.id }, (err, res) => {

            if (!res) {
                
                   console.log(`[Tox Mod | Bot] Invalid Response on Channel Pin Updates for ${channel.guild.name}. NOTE: This is not a Fatal Error and can be safely Ignored!`)
            
            } else {

                if (res.audit == "String") {

                   console.log(`[Tox Mod | Bot] No Audit Logs Channel Defined. NOTE: This is not a Fatal Error and can be safely Ignored!`)
                
                } else {

                    if (!client.guilds.cache.get(channel.guild.id).channels.cache.get(res.audit)) return;

                    let PinLogs = new MessageEmbed()
                      .setTitle('Action: Update Pinned Messages')
                      .setColor(Colors.Primary)
                      .setDescription(`Pinned Messages have been updated for the ${channel.name} channel.`)
                      .setTimestamp()
                      .setFooter(Embeds.Footer, Images.Animated)

                      client.guilds.cache.get(channel.guild.id).channels.cache.get(res.audit).send(PinLogs).catch((err) => {
                          console.log(`[Tox Mod | Bot] Failed to Send an Audit Log in ${channel.guild.name} | ERROR: ${err}`)
                      })
                }
            }
        })
    }
}
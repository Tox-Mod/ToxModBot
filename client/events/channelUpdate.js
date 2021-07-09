const moment = require('moment')
const SERVERS = require('@Database/servers');
const { MessageEmbed, Message } = require('discord.js');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = (client, oldChannel, newChannel) => {

    if (newChannel.guild) {

        SERVERS.findOne({ guildID: newChannel.guild.id }, (err, res) => {

            if (!res) {

                console.log(`[Tox Mod | Bot] Invalid Response on Channel Updates for ${newChannel.guild.name}. NOTE: This is not a Fatal Error and can be safely Ignored!`)

            } else {

                if (res.audit == "String") {

                    console.log(`[Tox Mod | Bot] No Audit Logs Channel Defined. NOTE: This is not a Fatal Error and can be safely Ignored!`)

                } else {

                    if (!client.guilds.cache.get(newChannel.guildID).channels.cache.get(res.audit)) return;

                    if (newChannel.name !== oldChannel.name) {

                        let UpdatedChannelName = new MessageEmbed()
                          .setTitle('Action: Update Channel Name')
                          .setColor(Colors.Primary)
                          .setThumbnail(newChannel.guild.iconURL({ dynamic: true }))
                          .setDescription(`Updated the Channel Name for ${newChannel.name}`)
                          .addField('Old Channel Name', `${oldChannel.name}`, true)
                          .addField('New Channel Name', `${newChannel.name}`, true)
                          .addField('Channel Created On', `${moment(newChannel.createdAt).format('MM/DD/YYYY HH:mm:ss A')}`, true)
                          .setTimestamp()
                          .setFooter(Embeds.Footer, Images.Animated)

                          client.guilds.cache.get(newChannel.guild.id).channels.cache.get(res.audit).send(UpdatedChannelName);
                    }

                    if (newChannel.parent !== oldChannel.parent) {

                        let OldCategory = oldChannel.parent;
                        let NewCategory = newChannel.parent;

                        if (OldCategory == null) OldCategory = "No category!"
                        if (NewCategory == null) NewCategory = "No category!"

                        let UpdatedChannelParent = new MessageEmbed()
                          .setTitle('Action: Update Channel Category')
                          .setColor(Colors.Primary)
                          .setThumbnail(newChannel.guild.iconURL({ dynamic: true }))
                          .setDescription(`Updated the Category/Parent for the ${newChannel.name} channel.`)
                          .addField('Old Category', `${OldCategory}`, true)
                          .addField('New Category', `${NewCategory}`, true)
                          .addField('Channel Created On', `${moment(newChannel.createdAt).format('MM/DD/YYYY HH:mm:ss A')}`, true)
                          .setTimestamp()
                          .setFooter(Embeds.Footer, Images.Animated)

                          client.guilds.cache.get(newChannel.guild.id).channels.cache.get(res.audit).send(UpdatedChannelParent);
                    }

                    if (newChannel.type !== oldChannel.type) {

                        let UpdatedChannelType = new MessageEmbed()
                          .setTitle('Action: Update Channel Type')
                          .setColor(Colors.Primary)
                          .setThumbnail(newChannel.guild.iconURL({ dynamic: true }))
                          .setDescription(`Updated the Type for the ${newChannel.name} channel.`)
                          .addField('Old Type', `${oldChannel.type}`, true)
                          .addField('New Type', `${newChannel.type}`, true)
                          .addField('Channel Created On', `${moment(newChannel.createdAt).format('MM/DD/YYYY HH:mm:ss A')}`, true)
                          .setTimestamp()
                          .setFooter(Embeds.Footer, Images.Animated)

                          client.guilds.cache.get(newChannel.guild.id).channels.cache.get(res.audit).send(UpdatedChannelType);
                    }
                }
            }
        })
    }
}
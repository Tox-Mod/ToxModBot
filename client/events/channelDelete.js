const SERVERS = require('@Database/servers');
const { MessageEmbed } = require('discord.js');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = (client, channel) => {

    if (channel.guild) {

        SERVERS.findOne({ guildID: channel.guild.id}, (err, res) => {

            if (!res) {

            } else {

                if (res.audit == "String") {

                } else {

                    if (!client.guilds.cache.get(channel.guild.id).channels.cache.get(res.audit)) return;

                    let embed = new MessageEmbed()
                     .setTitle('Audit Logs - Channel Deletion')
                     .setColor(Colors.Success)
                     .setThumbnail(Images.Animated)
                     .setDescription(`A Channel has been Deleted.`)
                     .addField('Channel Name', `${channel.name}`, true)
                     .addField('Channel ID', `${channel.id}`, true)
                     .addField('Channel Type', `${channel.type}`, true)
                     .setTimestamp()
                     .setFooter(Embeds.Footer, Images.Animated)

                     client.guilds.cache.get(channel.guild.id).channels.cache.get(res.audit).send(embed);
                }
            }
        })
    }
}
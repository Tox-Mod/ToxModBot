const SERVERS = require('@Database/servers');
const { MessageEmbed, Message } = require('discord.js');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = (client, role) => {

    if (role.guild) {

        SERVERS.findOne({ guildID: role.guild.id }, (err, res) => {

            if (!res) {

            } else {

                if (res.audit == "String") {

                } else {

                    if (!client.guilds.cache.get(role.guild.id).channels.cache.get(res.audit)) return;

                    let RoleEmbed = new MessageEmbed()
                     .setTitle('🎉 New Role Created')
                     .setColor(Colors.Primary)
                     .setThumbnail(role.guild.iconURL({ dynamic: true }))
                     .setDescription(`${role.name} has been Created Successfully!`)
                     .setTimestamp()
                     .setFooter(Embeds.Footer, role.guild.iconURL({ dynamic: true }))

                     client.guilds.cache.get(role.guild.id).channels.cache.get(res.audit).send(RoleEmbed).catch(() => {});
                }
            }
        })
    }
}
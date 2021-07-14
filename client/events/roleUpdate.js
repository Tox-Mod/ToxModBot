const SERVERS = require('@Database/servers');
const { MessageEmbed, Message } = require('discord.js');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = (client, oldRole, newRole) => {

    if (newRole.guild) {

        SERVERS.findOne({ guildID: newRole.guild.id }, (err, res) => {

            if (!res) {

            } else {

                if (res.audit == "String") {

                } else {

                    if (!client.guilds.cache.get(newRole.guild.id).channels.cache.get(res.audit)) return;

                    if (oldRole.name !== newRole.name) {

                    let RoleEmbed = new MessageEmbed()
                     .setTitle('✏️ Role Name Updated')
                     .setColor(Colors.Error)
                     .setThumbnail(newRole.guild.iconURL({ dynamic: true }))
                     .addField('New Name', `${newRole.name}`, true)
                     .addField('Old Name', `${oldRole.name}`, true)
                     .setTimestamp()
                     .setFooter(Embeds.Footer, newRole.guild.iconURL({ dynamic: true }))

                     client.guilds.cache.get(newRole.guild.id).channels.cache.get(res.audit).send(RoleEmbed).catch(() => {});
                }
              }
            }
        })
    }
}
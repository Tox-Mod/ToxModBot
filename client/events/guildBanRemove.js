const SERVERS = require('@Database/servers');
const { MessageEmbed, Message } = require('discord.js');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = (client, guild, member) => {

    if (guild) {

        SERVERS.findOne({ guildID: guild.id }, (err, res) => {

            if (!res) {

            } else {

                if (res.audit == "String") {

                } else {

                    if (!client.guilds.cache.get(guild.id).channels.cache.get(res.audit)) return;

                    let MemberUnbanned = new MessageEmbed()
                      .setTitle('Mod Action: Member UnBan')
                      .setColor(Colors.Error)
                      .setDescription('Last Chance, Dont screw it up!')
                      .addField('Member Tag', `${member.tag}`, true)
                      .addField('Member ID', `${member.id}`, true)
                      .setTimestamp()
                      .setFooter(Embeds.Footer, Images.Animated)

                      client.guilds.cache.get(guild.id).channels.cache.get(res.audit).send(MemberUnbanned);
                }
            } 
        })
    }
}
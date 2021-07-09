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

                    let NewMemberBanned = new MessageEmbed()
                      .setTitle('Mod Action: Member Ban')
                      .setColor(Colors.Error)
                      .setDescription('Uh-Oh, Someone screwed up and got Beaned. Noob!!')
                      .addField('Member Tag', `${member.tag}`, true)
                      .addField('Member ID', `${member.id}`, true)
                      .setTimestamp()
                      .setFooter(Embeds.Footer, Images.Animated)

                      client.guilds.cache.get(guild.id).channels.cache.get(res.audit).send(NewMemberBanned);
                }
            } 
        })
    }
}
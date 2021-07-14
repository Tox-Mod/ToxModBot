const SERVERS = require('@Database/servers');
const { MessageEmbed, Message } = require('discord.js');
const moment = require('moment')

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = (client, message) => {

    if (client.snipe.has(message.guild.id)) {
        client.snipe.delete(message.guild.id);
    }

    client.snipe.add(message.guild.id);

    client.snipe[message.guild.id] = {
        message: message.content,
        name: message.author.tag,
        channel: message.channel.name,
        time: moment(message.createdAt).format('YYYY-MM-DD'),
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    }

    SERVERS.findOne({ guildID: message.guild.id }, (err, res) => {

        if (!res) {

        } else {

            if (res.audit == "String") {

            } else {

                if (!client.guilds.cache.get(message.guild.id).channels.cache.get(res.audit)) return;

                if (message.content) {

                    let DeleteEmbed = new MessageEmbed()
                     .setTitle('🗑️ Message Deleted')
                     .setColor(Colors.Primary)
                     .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                     .addField('Deleted At', `${message.channel}`, true)
                     .addField('Deleted By', `${message.author.tag}`, true)
                     .addField('Message Content', `${message.content}`, true)
                     .addField('Message Created At', `${moment(message.createdAt).format('MM/DD/YYYY HH:mm:ss A')}`, true)
                     .setTimestamp()
                     .setFooter(Embeds.Footer, message.author.displayAvatarURL({ dynamic: true }))

                    client.guilds.cache.get(message.guild.id).channels.cache.get(res.audit).send(DeleteEmbed)
                }
            }
        }
    })
}
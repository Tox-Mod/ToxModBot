const SERVERS = require('@Database/servers');
const { MessageEmbed, Message } = require('discord.js');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = (client, guild) => {

    SERVERS.findOneAndDelete({ guildID: guild.id }, async (err, welchannel) => {

        if (err) console.error(`[Tox Mod | Bot] Stacktrace: ${err}`);

        let ByeGuildLog = new MessageEmbed()
        .setTitle('I have Left a Guild')
        .setColor(Colors.Error)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setDescription('Sad, Someone removed me from their Guild!')
        .addField('Guild Name', `${guild.name}`, true)
        .addField('Guild ID', `${guild.id}`, true)
        .setTimestamp()
        .setFooter(Embeds.Footer, Images.Animated)
  
        client.guilds.cache.get(client.config.SupportGuild).channels.cache.get(client.config.JoinLogs).send(ByeGuildLog);
    })
}
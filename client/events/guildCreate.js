const SERVERS = require('@Database/servers');
const { MessageEmbed, Message } = require('discord.js');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = (client, guild) => {

    const ChannelSet = new SERVERS({
        antispam: "0",
        maxwarns: "3",
        levelsys: "1",
        guildID: guild.id,
        mutedrole: "String",
        prefix: "tox.",
        welcome: "String",
        leave: "String",
        audit: "String",
        autorole: "String",
        antiraid: "0",
        welcomemsg: "String",
        leavemsg: "String",
        private: "String",
        botautorole: "String",
    });

    ChannelSet.save();

    let NewGuildLog = new MessageEmbed()
      .setTitle('New Guild Created/Joined')
      .setColor(Colors.Primary)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setDescription('Woah, Someone thinks im Cool and invited me to their Server! I have also successfully Set their Guilds Info in the Database!')
      .addField('Guild Name', `${guild.name}`, true)
      .addField('Guild ID', `${guild.id}`, true)
      .setTimestamp()
      .setFooter(Embeds.Footer, Images.Animated)

      client.guilds.cache.get(client.config.SupportGuild).channels.cache.get(client.config.JoinLogs).send(NewGuildLog);
}
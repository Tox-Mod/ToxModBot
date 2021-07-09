const { MessageEmbed } = require('discord.js');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

    let TheChannel = args.slice(0).join(' ');

    let NoChannelArgs = new MessageEmbed()
      .setTitle('Error | Invalid Args')
      .setColor(Colors.Error)
      .setDescription('Please define a Channel Name, Mention or ID!')
      .setTimestamp()
      .setFooter(Embeds.Footer, Images.Animated)

    if (!TheChannel) return message.channel.send(NoChannelArgs);

    let GuildChannel = message.mentions.channels.first() || message.guild.channels.cache.get(TheChannel) || message.guild.channels.cache.find(c => c.name === TheChannel);

    let NoChannelFound = new MessageEmbed()
      .setTitle('Error | Invalid Channel')
      .setColor(Colors.Error)
      .setDescription('Unable to find the Channel Provided. Please try again noob!')
      .setTimestamp()
      .setFooter(Embeds.Footer, Images.Animated)

    if (!GuildChannel) return message.channel.send(NoChannelFound);

    let ChannelTopic = 'No channel topic available!'

    if (channel.topic) {

        ChannelTopic = channel.topic;
    }

    let ChannelEmbed = new MessageEmbed()
      .setTitle('Channel Information')
      .setColor(Colors.Primary)
      .setDescription('I guess i can give you that!')
      .addField('Name', `${GuildChannel.name}`, true)
      .addField('ID', `${GuildChannel.id}`, true)
      .addField('Type', `${GuildChannel.type}`, true)
      .addField('Created', `${GuildChannel.createdAt.toLocaleString()}`, true)
      .addField('Deleted', `${GuildChannel.deleted}`, true)
      .addField('Position', `${message.guild.channels.cache.filter(c => c.type == GuildChannel.type).size - channel.position}`, true)
      .addField('Topic', `${ChannelTopic}`, true)
      .setTimestamp()
      .setFooter(Embeds.Footer, Images.Animated)

      return message.channel.send(ChannelEmbed);

}

module.exports.help = {
    name: 'channel',
    category: 'info',
    aliases: ['chan', 'cinfo'],
    description: 'Display some information about the Provided Channel!',
    example: '``channel <@Channel>``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['SEND_MESSAGES', 'EMBED_LINKS'],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
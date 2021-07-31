const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');
const CLOCK = require('@Database/clock');
const moment = require('moment');
const fetch = require('node-fetch');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

const BotLists = require('@Settings/botlists');

module.exports.run = async (client, message, args, params) => {

    try {

        const { guild } = message;
        
        let counts = 'Guild has no roles.'

        let description;

        if (message.guild.roles.cache.size > 20) {
            counts = ` ... and **${(message.guild.roles.cache.size - 20)}** more`
        } else {
            counts = '.'
        }

        if (guild.description) {
            description = guild.description
        } else {
             guild.description = 'No description set'
        }

        let embed = new MessageEmbed()
         .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL({ dynamic: true }))
         .setColor(Colors.Secondary)
         .setThumbnail(guild.iconURL({ dynamic: true }))
         .setDescription(`${description || "No Description Set"}`)
         .addField('Guild Owner', `${message.guild.owner.user.tag} (${message.guild.owner.user.id})`, true)
         .addField('Created On', `${moment(guild.createdAt).format('MM/DD/YYYY HH:mm:ss A')}`, true)
         .addField('Server Region', `${guild.region}`, true)
         .addField('Total Members', `Humans: ${guild.members.cache.filter(member => !member.user.bot).size}\nBots: ${guild.members.cache.filter(member => member.user.bot).size}`, true)
         .addField('Offline Members', `⚪ ${message.guild.members.cache.filter(member => member.presence.status == "offline").size}`, true)
         .addField('Busy/DND Members', `🔴 ${message.guild.members.cache.filter(member => member.presence.status == "dnd").size}`, true)
         .addField('Online Members', `🟢 ${message.guild.members.cache.filter(member => member.presence.status == "online").size}`, true)
         .addField('Idle Members', `🟡 ${message.guild.members.cache.filter(member => member.presence.status == "idle").size}`, true)
         .addField('Text Channels', `${guild.channels.cache.filter(ch => ch.type === 'text').size}`, true)
         .addField('Voice Channels', `${guild.channels.cache.filter(ch => ch.type === 'voice').size}`, true)
         .addField('Total Boosts', `${message.guild.premiumSubscriptionCount}`, true)
         .addField('Boost Tier', `${message.guild.premiumTier}`, true)
         .addField('Total Roles', `${guild.roles.cache.size}`, true)
         .addField('Role List', `${message.guild.roles.cache.filter(r => r.id !== message.guild.id).first(20).sort((a, b) => b.position - a.position).map(r => r).join(' **›** ')}${counts}`, true)
         .addField('Total Emojis', `${guild.emojis.cache.size}`, true)
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

         return message.channel.send(embed);
        
    } catch (err) {

        let ErrorEmbed = new MessageEmbed()
         .setTitle('Internal Error | Hmmm')
         .setColor(Colors.Error)
         .setDescription('Something went wrong here, Please try again or Contact my Dev Team.')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        return message.channel.send(ErrorEmbed);

    }
}

module.exports.help = {
    name: 'serverinfo',
    category: 'info',
    aliases: ['si'],
    description: 'View some info about the Server',
    example: '``serverinfo``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["EMBED_LINKS"],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

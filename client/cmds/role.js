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

        let role = args.slice(0).join(" ");

        let NoRole = new MessageEmbed()
         .setTitle('You done goofed!')
         .setColor(Colors.Error)
         .setDescription('Please define a Role Name, Mention or ID')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        if (!role) return message.channel.send(NoRole);

        let cachedRole = message.mentions.roles.first() || message.guild.roles.cache.get(role) || message.guild.roles.cache.find(r => r.name === role);

        let NoCachedRole = new MessageEmbed()
         .setTitle('Hmm, Try that again!')
         .setColor(Colors.Error)
         .setDescription('Unable to find that Role in this Server!')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        if (!cachedRole) return message.channel.send(NoCachedRole)

        let RoleInfo = new MessageEmbed()
         .setTitle(`📜 ${cachedRole.name} Role Info`)
         .setColor(Colors.Primary)
         .addField('Name', `${cachedRole.name}`, true)
         .addField('ID', `${cachedRole.id}`, true)
         .addField('Color', `${cachedRole.hexColor}`, true)
         .addField('Editable', `${cachedRole.editable}`, true)
         .addField('Deleted', `${cachedRole.deleted}`, true)
         .addField('Hoisted', `${cachedRole.hoist}`, true)
         .addField('Mentionable', `${cachedRole.mentionable}`, true)
         .addField('Position', `${message.guild.roles.cache.size = cachedRole.position}`, true)
         .addField('Permissions', `${cachedRole.permissions.toArray().join(" , ")}`, true)
         .addField('Created At', `${cachedRole.createdAt.toLocaleString()}`, true)
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)
         
         return message.channel.send(RoleInfo);

        
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
    name: 'role',
    category: 'info',
    aliases: ['rinfo', 'ri', 'roleinfo'],
    description: 'View information about a Mentioned Role.',
    example: '``role <@Role>``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['EMBED_LINKS'],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
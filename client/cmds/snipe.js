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

        if (client.snipe.has(message.guild.id)) {

            let embed = new MessageEmbed()
             embed.setAuthor('✅ Snipe', client.user.displayAvatarURL({ dynamic: true }))
             embed.setColor(Colors.Secondary)
             if (client.snipe[message.guild,id].message) {
                embed.addField(`Sniped Message: `, `\`\`\`javascript\n${client.snipe[message.guild.id].message}\n\`\`\``, true)
             }
             embed.addField('Sent By', `${client.snipe[message.guild.id].name}`, true)
             embed.addField('Sent In', `${client.snipe[message.guild.id].channel}`, true)
             embed.addField('Sniped By', `${message.author.tag}`, true)
             embed.addField('Deleted At', `${client.snipe[message.guild.id].time}`, true)
             if (client.snipe[message.guild.id].image) {
                embed.setImage(client.snipe[message.guild.id].image)
             }
             embed.setTimestamp()
             embed.setFooter(Embeds.Footer, Images.Animated)

             return message.channel.send(embed);
        }

        let embed1 = new MessageEmbed()
         .setTitle('Nothing to snipe!')
         .setColor(Colors.Error)
         .setDescription('This server has nothing to snipe or i am unable to see Deleted Messages.')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

         return message.channel.send(embed1);

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
    name: 'snipe',
    category: 'chat',
    aliases: [],
    description: 'Snipe any deleted messages or images!',
    example: '``snipe``'
}

module.exports.requirements = {
    userPerms: ["MANAGE_MESSAGES"],
    clientPerms: ["EMBED_LINKS"],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
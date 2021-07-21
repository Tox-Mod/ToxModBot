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

        
        let embed = new MessageEmbed()
         .setTitle('Woah, Invalid Usage')
         .setColor(Colors.Error)
         .setDescription('Command Usage: ``unban <UserID>``')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        if (!args[0]) return message.channel.send(embed);

        if (isNaN(arhs[0])) return message.channel.send(embed);

        let test = args[0];

        let embed2 = new MessageEmbed()
         .setTitle('Lol. Are you trying to Unban the Air?')
         .setColor(Colors.Error)
         .setDescription('Please provide a valid User ID. Should be no more or less then 18 Characters')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        if (test.length !== 18) return message.channel.send(embed2);

        const banList = await message.guild.fetchBans();

        if (banList.has(args[0])) {

            const bannedUser = await client.users.fetch(args[0]);

            message.guild.members.unban(bannedUser);

            let embed3 = new MessageEmbed()
             .setTitle('Woah, Mistakes may have been made!')
             .setColor(Colors.Primary)
             .setDescription(`${bannedUser} has been unbanned from the server!`)
             .setTimestamp()
             .setFooter(Embeds.Footer, Images.Animated)

            message.channel.send(embed3)

            SERVERS.findOne({ guildID: message.guild.id }, (err, res) => {

                let logChan = message.guild.channels.cache.get(res.mod);

                if (logChan) {

                    let embed4 = new MessageEmbed()
                     .setTitle('Action: Unban')
                     .setColor(Colors.Primary)
                     .setDescription('Someone Unbanned a trouble maker!')
                     .addField('Moderator', `${message.author.tag}`, true)
                     .addField('User', `${bannedUser}`, true)
                     .setTimestamp()
                     .setFooter(Embeds.Footer, Images.Animated)

                     logChan.send(embed4)
                }
            })

            CASES.find({ serverID: message.guild.id }).sort([['descending']]).exec((err, res) => {

                let userCases = new CASES({
                    userID: args[0],
                    reason: "No reason Provided!",
                    action: "UnBan",
                    Moderator: message.author.id,
                    serverID: message.guild.id,
                    time: moment(message.createdAt).format('MM/DD/YYYY HH:mm:ss A'),
                    case: res.length + 1
                })

                userCases.save()

                let embed5 = new MessageEmbed()
                 .setTitle('Action: Unban')
                 .setColor(Colors.Primary)
                 .setDescription(`Your ban in ${message.guild.name} has been lifted`)
                 .addField('Moderator', `${message.author.tag}`, true)
                 .setTimestamp()
                 .setFooter(Embeds.Footer, Images.Animated)

                 bannedUser.send(embed5).catch(() => {});
            })
        } else {

            let embed6 = new MessageEmbed()
             .setTitle('Woah, Are you sure?')
             .setColor(Colors.Error)
             .setDescription('The user provided is not Banned from this Server!')
             .setTimestamp()
             .setFooter(Embeds.Footer, Images.Animated)

            return message.channel.send(embed6);
        }
    } catch (err) {

        let ErrorEmbed = new Discord.MessageEmbed()
         .setTitle('Internal Error | Hmmm')
         .setColor(Colors.Error)
         .setDescription('Something went wrong here, Please try again or Contact my Dev Team.')
         .setTimestamp()
         .setFooter(Embeds.Footer, Images.Animated)

        return message.channel.send(ErrorEmbed);
    }
}

module.exports.help = {
    name: 'unban',
    category: 'mod',
    aliases: ['uban'],
    description: 'Unban a user from the Server',
    example: '``unban <UserID>``'
}

module.exports.requirements = {
    userPerms: ['BAN_MEMBERS'],
    clientPerms: ['BAN_MEMBERS'],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
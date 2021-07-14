const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

    try {

        let NoUserMsg = new MessageEmbed()
          .setTitle('Error | No User Provided')
          .setColor(Colors.Error)
          .setDescription('Please provide a user for this Action!')
          .setTimestamp()
          .setFooter(Embeds.Footer, Images.Animated)

        if (!args[0]) return message.channel.send(NoUserMsg);

        let reason = args.slice(1).join(" ");

        if (!reason) reason = 'No reason provided!'

        await client.users.fetch(args[0]).then(async member => {

            let UserNotFound = new MessageEmbed()
             .setTitle('Error | User not Found!')
             .setColor(Colors.Error)
             .setDescription('Seems like i was unable to find that user!')
             .setTimestamp()
             .setFooter(Embeds.Footer, Images.Animated)

            if (!member) return message.channel.send(UserNotFound);

            let UserExists = new MessageEmbed()
             .setTitle('Error | User in Server!')
             .setColor(Colors.Error)
             .setDescription('Please use the default `ban` Command. Hackban is for Users who are **not** a Member of the Server')
             .setTimestamp()
             .setFooter(Embeds.Footer, Images.Animated)

            if (message.guild.members.cache.get(member.id)) return message.channel.send(UserExists);

            const guildBans = await message.guild.fetchBans();

            let UserBanned = new MessageEmbed()
             .setTitle('Error | User is already Banned!')
             .setColor(Colors.Error)
             .setDescription('That user is already Banned in this Server!')
             .setTimestamp()
             .setFooter(Embeds.Footer, Images.Animated)

            if (guildBans.has(member.id)) return message.channel.send(UserBanned);

            else {

                message.guild.members.ban(member, reason).then(() => {

                    let HackBanSuccess = new MessageEmbed()
                    .setTitle('👢 Hackban Successful!')
                    .setColor(Colors.Primary)
                    .setDescription("We don't have to worry about that Shit Head anymore!")
                    .addField('Banned User', `${member.tag}`, true)
                    .addField('Moderator', `${message.author.tag}`, true)
                    .addField('Reason', `${reason}`, true)
                    .setTimestamp()
                    .setFooter(Embeds.Footer, Images.Animated)

                    message.channel.send(HackBanSuccess);

                    SERVERS.findOne({ guildID: message.guild.id, }, async (err, res) => {

                        let channel = message.guild.channels.cache.get(res.mod);

                        if (channel) {

                            let HackBanLog = new MessageEmbed()
                             .setTitle('Action: Hack Ban')
                             .setColor(Colors.Error)
                             .addField('Banned User', `${member.tag}`, true)
                             .addField('Moderator', `${message.author.tag}`, true)
                             .addField('Reason', `${reason}`, true)
                             .setTimestamp()
                             .setFooter('Note: Moderator Actions are recorded Globally!', Images.Animated)

                            channel.send(HackBanLog);
                        }
                    })

                    CASES.find({ serverID: message.guild.id }).sort([['descending']]).exec((err, res) => {

                        let cases1 = new CASES({
                            userID: member.id,
                            reason: reason,
                            action: "HackBan",
                            Moderator: message.author.id,
                            serverID: message.guild.id,
                            time: moment(message.createdAt).format('MM/DD/YYYY HH:mm:ss A'),
                            case: res.length + 1
                        })

                        cases1.save();

                        let HackBanDM = new MessageEmbed()
                          .setTitle('Action: Hack Ban!')
                          .setColor(Colors.Error)
                          .setDescription("Whoops, You have been banned from a Guild in your Absence!")
                          .addField('Banned User', `${member.tag}`, true)
                          .addField('Moderator', `${message.author.tag}`, true)
                          .addField('Reason', `${reason}`, true)
                          .setTimestamp()
                          .setFooter('Note: Moderator Actions are recorded Globally!', Images.Animated)

                          member.send(HackBanDM).catch(() => {});
                    })
                })
            }
        })

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
    name: 'hackban',
    category: 'mod',
    aliases: ['hban'],
    description: 'Ban a user who is not an Active Member of the Server',
    example: '``hackban <userID> [Reason]``'
}

module.exports.requirements = {
    userPerms: ["BAN_MEMBERS"],
    clientPerms: ["BAN_MEMBERS"],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
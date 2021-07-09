const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

    let NoBanArgs = new MessageEmbed()
      .setTitle('Error | Invalid Args')
      .setColor(Colors.Error)
      .setDescription('I cannot ban the air noob. Please mention someone!')
      .setTimestamp()
      .setFooter(Embeds.Footer, Images.Animated)

      if (!args[0]) return message.channel.send(NoBanArgs);

      let MentionedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

      let NoUserFound = new MessageEmbed()
        .setTitle('Error | Invalid Args')
        .setColor(Colors.Error)
        .setDescription('Unable to locate the provided user, Did they leave the server?')
        .setTimestamp()
        .setFooter(Embeds.Footer, Images.Animated)

        if (!MentionedUser) return message.channel.send(NoUserFound);

      let InvalidPermissions = new MessageEmbed()
        .setTitle('Error | Invalid Permissions')
        .setColor(Colors.Error)
        .setDescription('You cannot Ban Users who are Higher then you in the Role Hierarchy!')
        .setTimestamp()
        .setFooter(Embeds.Footer, Images.Animated)
        
        if (MentionedUser.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(InvalidPermissions);

        if (MentionedUser) {

            const GuildBans = await message.guild.fetchBans();

            if (GuildBans.has(MentionedUser.id)) {

                let UserIsBanned = new MessageEmbed()
                  .setTitle('Error | Unable to Ban that User')
                  .setColor(Colors.Error)
                  .setDescription('That user has already been banned from this guild.')
                  .setTimestamp()
                  .setFooter(Embeds.Footer, Images.Animated)

                  return message.channel.send(UserIsBanned);
            }

            MemberToBan = message.guild.member(MentionedUser);

            let BanReason = args.slice(1).join(' ');

            if (!BanReason) BanReason = 'No reason provided.'

            if (MemberToBan) {

                await MemberToBan.ban({ reason: BanReason }).then(() => {

                    SERVERS.findOne({ guildID: message.guild.id }, (err, res) => {

                        let LogChannel = message.guild.channels.cache.get(res.mod);

                        if (LogChannel) {

                            let BanLog = new MessageEmbed()
                              .setTitle('Action | User Banned')
                              .setColor(Colors.Error)
                              .setDescription('A user has been banned!')
                              .addField('Case', `#${res.length}`, true)
                              .addField('User', `${MemberToBan.user.tag}`, true)
                              .addField('Reason', `${BanReason}`, true)
                              .addField('Moderator', `${message.author.tag}`, true)
                              .setTimestamp()
                              .setFooter(Embeds.Footer, Images.Animated)

                              LogChannel.send(BanLog);
                        }
                    })

                    let UserBanned = new MessageEmbed()
                      .setTitle('Success | User Banned')
                      .setColor(Colors.Success)
                      .setDescription(`${MemberToBan.user.tag} has been banned successfully. You dont have to worry about that shit disturber anymore!`)
                      .setTimestamp()
                      .setFooter(Embeds.Footer, Images.Animated)

                      message.channel.send(UserBanned);

                      CASES.find({ serverID: message.guild.id }).sort([['descending']]).exec( async (err, res) => {

                        let infractions = await new CASES({
                            userID: MemberToBan.id,
                            reason: BanReason,
                            action: 'Ban',
                            Moderator: message.author.id,
                            serverID: message.guild.id,
                            time: moment(message.createdAt).format('MM/DD/YYYY HH:mm:ss A'),
                            case: res.length + 1
                        })

                        infractions.save();

                        let BannedEmbed = new MessageEmbed()
                          .setTitle('Action: Ban')
                          .setColor(Colors.Error)
                          .setDescription(`You have been banned from ${message.guild.name}`)
                          .addField('Case', `#${res.length}`, true)
                          .addField('Reason', `${BanReason}`, true)
                          .addField('Moderator', `${message.author.tag}`, true)
                          .setTimestamp()
                          .setFooter(Embeds.Footer, Images.Animated)

                          MemberToBan.send(BannedEmbed).catch(() => {});
                      })
                }).catch(err => {

                    let BanError = new MessageEmbed()
                      .setTitle('Error | Ban Failed')
                      .setColor(Colors.Success)
                      .setDescription('I was unable to ban that user or an error occured. If this continues please report it to my Dev Team!')
                      .addField('Error Message', `${err}`)
                      .setTimestamp()
                      .setFooter(Embeds.Footer, Images.Animated)

                      message.channel.send(BanError);
                });
            } else {

                let UserNotFound = new MessageEmbed()
                  .setTitle('Error | Ban Failed')
                  .setColor(Colors.Error)
                  .setDescription('That user is not an Active Member of this Server!')
                  .setTimestamp()
                  .setFooter(Embeds.Footer, Images.Animated)

                  message.channel.send(UserNotFound);
            }
        } else {

            let InternalError = new MessageEmbed()
              .setTitle('Error | Ban Failed')
              .setColor(Colors.Error)
              .setDescription('That user is not an Active Member of this Server or an Unknown Error occured!')
              .setTimestamp()
              .setFooter(Embeds.Footer, Images.Animated)

              message.channel.send(InternalError)
    }
}

module.exports.help = {
    name: 'ban',
    category: 'mod',
    aliases: ['banem', 'yeet', 'bean'],
    description: 'Ban the Provided User from the Server!',
    example: '``ban <@User> <Reason>``'
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
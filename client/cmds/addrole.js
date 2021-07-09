const { MessageEmbed } = require('discord.js');
const SERVERS = require('@Database/servers');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args) => {

    let member = message.mentions.members.first || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.username === agrs[0]);

    if (!member) {

        let NoMember = new MessageEmbed()
          .setTitle('Error | Add Role Failed')
          .setColor(Colors.Error)
          .setDescription('I cannot add a role to the air bruh. Please mention someone.')
          .setTimestamp()
          .setFooter(Embeds.Footer, Images.Animated)

          return message.channel.send(NoMember);
    } else {

        if (member.roles.highest.position >= message.member.roles.highest.position) {

            let HigherPerms = new MessageEmbed()
              .setTitle('Error | Invalid Permissions')
              .setColor(Colors.Error)
              .setDescription('You cannot give roles to a person who is Higher then or Equal to your position on the Hierarchy.. Noob!')
              .setTimestamp()
              .setFooter(Embeds.Footer, Images.Animated)

              return message.channel.send(HigherPerms);
        }

        let role = args.slice(1).join(' ');

        let check = message.guild.roles.cache.find(r => r.name === role) || message.guild.roles.cache.get(role) || message.mentions.roles.first();

        if (!check) {

            let RoleNotFound = new MessageEmbed()
              .setTitle('Error | Missing Role')
              .setColor(Colors.Error)
              .setDescription('Unable to find that role, Did you even create it or are you a complete noob?')
              .setTimestamp()
              .setFooter(Embeds.Footer, Images.Animated)

              return message.channel.send(RoleNotFound);
        } else {

            let InvalidHierarchy = new MessageEmbed()
              .setTitle('Error | Invalid Permissions')
              .setColor(Colors.Error)
              .setDescription('That role is to high in the Hierarchy for me to access.')
              .setTimestamp()
              .setFooter(Embeds.Footer, Images.Animated)

              if (check.position >= message.guild.me.roles.highest.position) return message.channel.send(InvalidHierarchy);

              let UserHasRole = new MessageEmbed()
                .setTitle('Error | Role Found')
                .setColor(Colors.Error)
                .setDescription('Come on bro. This user already has that role')
                .setTimestamp()
                .setFooter(Embeds.Footer, Images.Animated)

                if (member.roles.cache.get(check.id)) return message.channel.send(UserHasRole);

                await member.roles.add(check);

                let RoleAddedMsg = new MessageEmbed()
                .setTitle('Success | Role Added')
                .setColor(Colors.Success)
                .setDescription(`${check.name} has been assigned to ${member.user.tag}`)
                .setTimestamp()
                .setFooter(Embeds.Footer, Images.Animated)

                let RoleAddedLog = new MessageEmbed()
                  .setTitle('Success | Role Added')
                  .setColor(Colors.Success)
                  .setDescription(`Role has been assigned to ${member.user.username}`)
                  .addField('Role Name', `${check.name}`, true)
                  .addField('User Tag', `${member.user.tag}`, true)
                  .addField('Moderator', `${message.author.tag}`, true)
                  .setTimestamp()
                  .setFooter(Embeds.Footer, Images.Animated)

                 message.channel.send(RoleAddedMsg);

                 SERVERS.findOne({ guildID: message.guild.id }, (err, res) => {

                    let channel = message.guild.channels.cache.get(res.mod)

                    if (channel) {

                        return channel.send(RoleAddedLog);
                    }
                 })
        }
    }
}

module.exports.help = {
    name: 'addrole',
    category: 'mod',
    aliases: ['ar'],
    description: 'Give roles to a specified user!',
    example: '``addrole <@User> <@Role>``'
}

module.exports.requirements = {
    userPerms: ['MANAGE_ROLES'],
    clientPerms: ['MANAGE_ROLES', 'SEND_MESSAGES'],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
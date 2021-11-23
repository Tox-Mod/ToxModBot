const { MessageEmbed } = require('discord.js');
const CASES = require('@Database/cases');
const SERVERS = require('@Database/servers');
const BLACKLIST = require('@Database/blacklist');
const { inspect } = require("util")
const config = require('@Settings/config');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports.run = async (client, message, args, params) => {

     const logs = await client.guilds.cache.get(config.SupportGuild).channels.cache.find(c => c.id === config.AuthLogs)  

     const match = message.content.match(/\d{18}/);
      
     let member;
      
     try {
      
       member =  match ? message.mentions.members.first() || message.guild.members.fetch(args[1]) : null;
    
      } catch {

        return message.channel.send(`Please provide me with a User ID to Blacklist`)
      }
   
      let guild = client.guilds.cache.get(args[1]);
      let reason = args.slice(2).join(' ') || 'No reason Specified!';

      if (args.length < 1) return message.channel.send(`Please provide me with a User or Guild ID to Blacklist!`)
      if (args.length < 2) return message.channel.send(`Please provide me with a User ID to Blacklist!`)
 
   


      if(!member) return message.channel.send(`Please provide me with a Valid User ID`)

      if (args[0] === 'user') {
    
        await BLACKLIST.findOne({
          userID: member.id,
        }, (err, user) => {

          if (!user) {

            const blacklist = new BLACKLIST({ 
                  userID: member.id, 
                  length: null, 
                  type: 'user', 
                  isBlacklisted: false, 
                  reason: reason 
              })

            blacklist.save()

          } else {

            user.updateOne({ 
              type: 'user', 
              isBlacklisted: false, 
              reason: reason,
              length: null, 
            })
          }
        });

       const embed = new MessageEmbed()
          .setTitle(`Woah, Okay then!`)
          .setColor(Colors.Success)
          .setDescription(`${member.user.tag} has been removed from the blacklist!`)
          .addField('Reason', `${reason}`)
          .setTimestamp()
          .setFooter(Embeds.Footer, Images.Animated)

        message.channel.send(embed);

        const embed2 = new MessageEmbed()
          .setColor(Colors.Error)
          .setTitle(`Action: User Blacklist`)
          .addField('Status', 'Removed from blacklist.', true)
          .addField('User', `${member.user.tag} (${member.id})`, true)
          .addField('Mod', `${message.author} (${message.author.id})`, true)
          .addField('Reason', `${reason}`, true)
          .setTimestamp()
          .setFooter(Embeds.Footer, Images.Animated)

        return logs.send(embed2);
    }

      if (args[0] === 'guild') {

        await BLACKLIST.findOne({
          guildID: guild,
        }, (err, server) => {

          if (!server) {

            const blacklist = new BLACKLIST({ 
                  guildID: guild.id, 
                  length: null, 
                  type: 'guild', 
                  isBlacklisted: false, 
                  reason: reason 
             })
            
            blacklist.save()

          } else {

            server.updateOne({ 
              type: 'guild', 
              isBlacklisted: false, 
              reason: reason, 
              length: null 
            })
          }
       });

       const embed3 = new MessageEmbed()
          .setTitle(`Woah, Okay then!`)
          .setColor(Colors.Success)
          .setDescription(`${guild.name} has been removed from the blacklist!`)
          .addField('Reason', `${reason}`)
          .setTimestamp()
          .setFooter(Embeds.Footer, Images.Animated)

       message.channel.send(embed3);

        const embed4 = new MessageEmbed()
          .setColor(Colors.Error)
          .setTitle(`Action: Guild Blacklist`)
          .addField('Status', 'Removed from blacklist.', true)
          .addField('Server', `${guild.name} (${guild.id})`, true)
          .addField('Mod', `${message.author} (${message.author.id})`, true)
          .addField('Reason', `${reason}`, true)
          .setTimestamp()
          .setFooter(Embeds.Footer, Images.Animated)

        return logs.send(embed4);
   }
}

module.exports.help = {
    name: 'unblacklist',
    category: 'owner',
    aliases: ['ubl'],
    description: 'Remove a Blacklist from a User or Guild',
    example: '``unblacklist <userID> | unblacklist <guildID>``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['EMBED_LINKS', 'SEND_MESSAGES'],
    ownerOnly: true,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

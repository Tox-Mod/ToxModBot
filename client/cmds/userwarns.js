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

        let theuser = args.slice(0).join(" ")

        let userses = message.mentions.users.first() || client.users.cache.get(theuser) || client.users.cache.find(u => u.username === theuser);

        if(!userses){

            let embed = new MessageEmbed()
             .setTitle("❌ Invalid Usage")
             .addField("**Note**", "Maybe that user isn\'t in the server")
             .setDescription("**Right Usage**\n ``userwarns <@user>``\n``userwarns <user_id>``\n``userwarns <user_name>``")
             .setFooter("< Required Parameters >")
             .setColor(Colors.Error)

            return message.channel.send(embed)
        }

        if(userses.bot) {
            return message.channel.send("❌ Lol, Bots can't be warned!")
        }

        CASES.find({
            serverID: message.guild.id,
            action: "Warn",
            userID: userses.id}, (err, res) => {

                    let embed2 = new MessageEmbed()
                    .setTitle(`📃 ${userses.username}` + " Infractions!")
                    .setColor(Colors.Primary)
                    .setAuthor(`${userses.username}`, userses.displayAvatarURL({dynamic: true}))

                    if(!res){
                        embed2.addField("Warns", "0", true);
                        return message.channel.send(embed2);
                    }else{
                        embed2.addField("Warns", res.length, true);
                        return message.channel.send(embed2)
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
    name: "userwarns",
    category: "mod",
    aliases: ['uwarns', 'infractions'],
    description: "Check a users infractions!",
    example: "``userwarns <@user>``"
}

module.exports.requirements = {
    userPerms: ["MANAGE_ROLES"],
    clientPerms: ['SEND_MESSAGES'],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

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

        if(!args[0]) return message.reply("**❌ Please provide a user for the action!**")

    SERVERS.findOne({
        guildID: message.guild.id}, (err, serverman) => {

    let userses = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!userses) return message.channel.send("❌ Seems like i can't find the user!")

    if(userses.user.bot) {
        return message.channel.send("❌ You can't warn bot!")
    }

    if(userses == message.member){
        return message.channel.send("❌ Can't warn yourself!")
    }

    if(userses.roles.highest.position >= message.member.roles.highest.position){
        return message.channel.send("❌ You can't warn person have roles higher than or same to you!")
   }

    let reason = args.slice(1).join(" ")

    if(!reason) reason = 'No Reason Provided'

    if (message.author.bot) return;

    CASES.find({
        serverID: message.guild.id
            }).sort([
              ['descending']
            ]).exec((err, res) => {

                if(res.length == serverman.maxwarns){

                    if(!message.guild.roles.cache.get(serverman.mutedrole)) return message.channel.send(`I Can't find the mute role you set , add a new muted role from the [Dashboard](https://toxmod.xyz/dashboard) `)

                    if(userses.roles.cache.get(serverman.mutedrole)) return message.reply("That user got max warns exceeded so he is currently muted!")

                    let role = message.guild.roles.cache.get(serverman.mutedrole);

                    userses.roles.add(role)

                    return message.channel.send("⚠️ Max warns exceeded for that user , he got muted")
        }

        let cases1 = new CASES({
            userID: userses.user.id,
            reason: reason,
            action: "Warn",
            Moderator: message.author.id,
            serverID: message.guild.id,
            time: moment(message.createdAt).format('MM/DD/YYYY HH:mm:ss A'),
            case: res.length + 1
        })

        cases1.save()

        let embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} | Unmute`, message.guild.iconURL({dynamic: true}))
        .setColor("RED")
        .setDescription(`Case Number: \`#${res.length}\` \nModerator: **${message.author.tag}** (\`${message.author.id}\`) \nAllegation: **${userses.user.tag}** (\`${userses.user.id}\`)`)
        .addField("**Reason**", reason)
        .setFooter(moment(message.createdAt).format('MM/DD/YYYY HH:mm:ss A'))

        userses.send(embed).catch(() => {})

        SERVERS.findOne({
            guildID: message.guild.id}, (err, res) => {

           let channel = message.guild.channels.cache.get(res.mod)

           if(channel){
            channel.send(`⚠️ **${userses.user.tag}** has been warned by **${message.author.tag}**, Reason: **${reason}**`)
           }
        })
          message.channel.send(`⚠️ **${userses.user.tag}** has been warned , Reason: **${reason}**`)
       })
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
    name: "warn",
    category: "mod",
    aliases: [],
    description: "Warn a member of the Server",
    example: "``warn <@User> [reason]``"
}

module.exports.requirements = {
    userPerms: ["MANAGE_ROLES"],
    clientPerms: [],
    ownerOnly: false,
    betaMode: false,
    devLock: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}

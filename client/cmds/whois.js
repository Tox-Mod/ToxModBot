const Discord = require('discord.js');
const CASES = require('@Database/cases');
const USERS = require('@Database/users');
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

        if(!userses) userses = message.author

        client.users.fetch(userses.id).then(user => {
    
            USERS.findOne({
              userID: user.id}, (err, resbio) => {
    
            CASES.find({
        userID: user.id}, (err, res) => {
   
            let thebot = "No";
   
            let inserver = "No";
   
            let nickname = "No nickname";
   
            if(user.bot){
              thebot = "Yes";
            }
            
        if (message.guild.members.cache.get(user.id)){
               inserver = "Yes";
            if(message.guild.member(user).nickname){
               nickname = message.guild.member(user).nickname
            }
        }

        let stat = '⚪ Offline'
   
        if(user.presence.status == 'online'){
           stat = '🟢 Online'
        }else if(user.presence.status == 'dnd'){
           stat = '🔴 Do Not Disturb'
        }else if(user.presence.status == 'idle'){
           stat = '🟡 Idle'
        }
   
        let rolee = 'No Roles'
   
        let embed = new MessageEmbed()
         .setAuthor(`❓ ${user.tag}` + ` (${user.id})`, user.displayAvatarURL({dynamic: true}))
         .setThumbnail(user.displayAvatarURL({dynamic: true}))
         .addField("Bot","``🤖 " + thebot + "``", true)
         .addField("Created at","``👥 " + moment(user.createdAt).format('MM/DD/YYYY HH:mm:ss A') + "``", true)
         .addField("Global Infractions", "``⚖️ " + res.length + "``", true)
         .addField("User presence", "``" + stat + "``", true)
         .setColor(Colors.Primary)

    if(!user.bot){

        embed.addField("Exists in server","``🙍 " + inserver + "``", true)

        if(!resbio){
                    embed.setDescription("**📜 Bio:** ``This user prefers to be Anonymous``", true)
                }else{ 
                    embed.setDescription("**📜 Bio:** ``" + resbio.bio + "``", true)
                }
        }
    
        if(user.presence.clientStatus){
           let clistat = "Using: =>";
    
        if(user.presence.clientStatus.desktop){
           clistat = clistat + "\n🖥️ Desktop"
        }
    
        if(user.presence.clientStatus.web){
           clistat = clistat +  "\n📟 Browser"
        }
    
        if(user.presence.clientStatus.mobile){
           clistat = clistat + "\n📱 Phone"
        }
           embed.addField("Client Status", "``" + clistat + "``", true)
        }
    
        if(user.flags){
           let flags = user.flags.toArray().map(x => x.replace(/_/g, " ").toLowerCase().replace(/(\b\w)/gi, c => c.toUpperCase())).join("\n")
           if(!flags) flags = "No flags"
           embed.addField("User badges", "``" + flags + "``", true)
        }

        if(user.presence.activities[0]){
           let custom = "";
           custom = user.presence.activities[0].state == null ? "No custom status!" : user.presence.activities[0].state;
           embed.addField("Custom Status", "``" + custom + "``", true)
        }

        if(message.guild.members.cache.get(user.id)){
        if(message.guild.member(user).roles.cache.filter(r => r.id !== message.guild.id).map(r => r).length > 0){
            rolee = `${message.guild.member(user).roles.cache.filter(r => r.id !== message.guild.id).first(20).sort((a, b) => b.position - a.position).map(r => r).join(' **›** ')}`
        }
         embed.addField("Member Joined", "``" + moment(message.guild.member(user).joinedAt).format('MM/DD/YYYY HH:mm:ss A') + "``", true)
         embed.addField("Nickname","``📝 " + nickname + "``", true)
         embed.addField("Roles", rolee)
        }else{
         embed.addField("Information", "``User not in guild to show guild information for him``")
        }

          message.channel.send(embed)
        })
       }) 
     })
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
    name: "whois",
    category: "info",
    aliases: ['profile', 'ui'],
    description: "Check info about a specified user!",
    example: "``whois <@User>``"
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
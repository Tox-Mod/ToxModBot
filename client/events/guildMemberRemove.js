const SERVERS = require('@Database/servers');
const MUTED = require('@Database/clock');
const { MessageEmbed, Message } = require('discord.js');
const moment = require('moment')

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = async (client, member) => {

    if(member.guild){

        SERVERS.findOne({ guildID: member.guild.id}, (err , res) => {

            if(!res){

                }else{

                if(res){
                    if(res.antiraid == "1") return
                }

                if(res.leave == "String"){        

                }else{

                if(res.leavemsg == "String"){

                    if(!client.guilds.cache.get(member.guild.id).channels.cache.get(res.leave)) return;

                    let messages = [
                            `**Good Bye ${member}**`,
                            `**${member} left us alone**`,
                            `**Bye ${member} hope to see you back again!**`,
                            `**${member} just left**`,
                            `**${member} just left**`,
                            `**${member} just left**`,
                            `**We will miss you ${member} bye!!**`,
                            `**${member} good bye**`,
                            `**${member} left**`,
                            `**We are not lucky anymore without you ${member} goodbye!**`,
                        ]

                        let displayMessage = messages[Math.ceil(Math.random() * messages.length)] || `**Good Bye ${member}**`;

                        let LeaveEmbed = new MessageEmbed()
                          .setTitle('Someone has left us all alone! 🎉')
                          .setColor(Colors.Error)
                          .setThumbnail(member.guild.iconURL({ dynamic: true }))
                          .setDescription(`${displayMessage}`)
                          .setTimestamp()
                          .setFooter(Embeds.Footer, member.guild.iconURL({ dynamic: true }))
  
                      client.guilds.cache.get(member.guild.id).channels.cache.get(res.leave).send(LeaveEmbed)

                }else{

                    if(!client.guilds.cache.get(member.guild.id).channels.cache.get(res.leave)) return;

                if(res.leavemsg !== "String"){

                    let leavemsg = res.leavemsg

                    if(leavemsg.includes("{member}")){
                        leavemsg = leavemsg.replace("{member}", member)
                    }

                    if(leavemsg.includes("{member.tag}")){
                        leavemsg = leavemsg.replace("{member.tag}", member.user.tag)
                    }

                    if(leavemsg.includes("{guild.name}")){
                        leavemsg = leavemsg.replace("{guild.name}", member.guild.name)
                    }

                    if(leavemsg.includes("{guild.memberCount}")){
                        leavemsg = leavemsg.replace("{guild.memberCount}", member.guild.memberCount)
                    }

                    if(leavemsg.includes("{member.username}")){
                        leavemsg = leavemsg.replace("{member.username}", member.user.username)
                    }

                    let LeaveEmbed2 = new MessageEmbed()
                      .setTitle('Someone has left us all alone! 🎉')
                      .setColor(Colors.Error)
                      .setThumbnail(member.guild.iconURL({ dynamic: true }))
                      .setDescription(`${leavemsg}`)
                      .setTimestamp()
                      .setFooter(Embeds.Footer, member.guild.iconURL({ dynamic: true }))

                    client.guilds.cache.get(member.guild.id).channels.cache.get(res.leave).send(LeaveEmbed2)
                }
            }
          }
        }
     })
   }
}

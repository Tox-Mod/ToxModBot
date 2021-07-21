const SERVERS = require('@Database/servers');
const { MessageEmbed, Message } = require('discord.js');
const moment = require('moment')

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

module.exports = (client, oldMessage, newMessage) => {

    if(newMessage.guild){

        SERVERS.findOne({ guildID: newMessage.guild.id}, (err , res) => {

        if(!res){

        }else{
        
            if(res.audit == "String"){        
                
            }else{
                    
                if(!client.guilds.cache.get(newMessage.guild.id).channels.cache.get(res.audit)) return
                    
                if(newMessage.content !== oldMessage.content){
                    
                    let UpdateEmbed = new MessageEmbed()
                     .setTitle('✏️ Message Edited')
                     .setColor(Colors.Primary)
                     .setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true }))
                     .addField('Jump to Message', `[Click Me](${newMessage.url})`, true)
                     .addField('Old Message', `${oldMessage.content}` + " ", true)
                     .addField('New Message', `${newMessage.content}` + " ", true)
                     .addField('Edited At', `${newMessage.channel}`, true)
                     .setTimestamp()
                     .setFooter(Embeds.Footer, newMessage.author.displayAvatarURL({ dynamic: true }))
                    
                    if(newMessage.author.bot) return;
                        
                    client.guilds.cache.get(newMessage.guild.id).channels.cache.get(res.audit).send(UpdateEmbed).catch(() => {})
                }
             }
          }
      })
   }
}

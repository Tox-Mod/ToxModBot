const { readdirSync } = require("fs")
const { join } = require("path")
const filePath2 = join(__dirname, "..", "events");
const eventFiles2 = readdirSync(filePath2);
const timers = require("timers");
const mongoose = require('mongoose');
const package = require('../../package.json')
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

const config = require('@Settings/config');
const BotListData = require('@Settings/botlists');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

const { InfinityAutoPoster } = require('ibl-autopost')

module.exports = async (client) => {
    
  const poster = InfinityAutoPoster(BotListData.IBL_AUTH, client)

    const ready_channel = client.channels.cache.find(c => c.id === config.BotLogs);


    let activities = [
        {
            name: 'toxmod.xyz',
            options: {
                type: 'LISTENING',
                url: 'https://twitch.tv/monstercat'
            }
        },
        {
            name: 'tox.help',
            options: {
              type: 'WATCHING',
              url: "https://www.twitch.tv/monstercat"
            }
          },
          {
            name: `${client.users.cache.size} Users`,
            options: {
              type: 'WATCHING'
            }
          },
          {
            name: `${client.guilds.cache.size} Guilds`,
            options: {
              type: 'WATCHING'
            }
          },
          {
            name: ` with ${client.commands.size} Commands`,
            options: {
              type: 'PLAYING'
             }
        }
    ];

    let i = 0;

    timers.setInterval(() => {
        i = i == activities.length ? 0 : i;

        client.user.setActivity(activities[i].name, activities[i].options);

        i++
    }, 30000);

    console.log(`[Tox Mod | Bot] Signed in as ${client.user.username} | Loaded: ${eventFiles2.length} Events | Loaded: ${client.commands.size} Commands`);

    poster.on('posted', (stats) => { // ran when succesfully posted
      console.log(`Posted stats to Infinity Bots | Posted: ${stats.servers} Servers and ${stats.shards} Shards`)
    });
    
    /**await fetch('https://api.toxmod.xyz/v1/versions/check')
      .then(res => res.json())
      .then(json => {

            if (json.current === package.version) {
              
            let up_to_date = new MessageEmbed()
            .setAuthor('Version Check: Deploy Successful', Images.Animated)
            .setColor(Colors.Success)
            .setDescription('Tox Mod is Up-To Date and Ready!!')
            .addField('Current Version', `v${package.version}`, true)
            .addField('Newest Version', `v${json.current}`, true)
            .addField('Previous Version', `v${json.previous}`, true)
            .addField('Stable Version', `v${json.stable}`, true)
            .setTimestamp()
            .setFooter(Embeds.Footer, Images.Animated)
              
            return ready_channel.send(up_to_date);
              
            } else if (json.current !== package.version) { {
                let outdated = new MessageEmbed()
                .setAuthor('Version Check: Deploy Failed', Images.Animated)
                .setColor(Colors.Error)
                .setDescription('Your version of Tox Mod is Outdated, Please make sure its still deploying.')
                .addField('Current Version', `v${package.version}`, true)
                .addField('Newest Version', `v${json.current}`, true)
                .addField('Update Link', 'https://github.com/Tox-Mod/ToxModBot/releases', true)
                .setTimestamp()
                .setFooter(Embeds.Footer, Images.Animated)

            return ready_channel.send(outdated)
          }
       }
   }) **/
}

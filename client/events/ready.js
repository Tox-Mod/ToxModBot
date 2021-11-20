const { readdirSync } = require("fs")
const { join } = require("path")
const filePath2 = join(__dirname, "..", "events");
const eventFiles2 = readdirSync(filePath2);
const timers = require("timers");
const mongoose = require('mongoose');

const BotListData = require('@Settings/botlists');

const InfinityBotsClient = require('infinityapi.js');
const IBL = new InfinityBotsClient(BotListData.ClientID, BotListData.IBL_AUTH);

module.exports = async (client) => {

    //const VoidBotsClient = require("voidbots");
    //const voidbots = new VoidBotsClient(process.env.VOID_AUTH, { autoPost: true, webhookEnabled: false }, client.user.id);


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
    
    IBL.post(client.guilds.cache.size, '0')

}

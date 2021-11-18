require("module-alias/register");

const { Client, Collection } = require('discord.js');
const client = new Client({ 
    disableEveryone: true, 
    disabledEvents: ['TYPING_START']
});

const config = require('@Settings/config');
const BotListData = require('@Settings/botlists');

client.commands = new Collection();
client.aliases = new Collection();

client.limits = new Map();
client.snipe = new Set();

client.config = config;

const commands = require('@Structure/commands');
const events = require('@Structure/events');

commands.run(client);
events.run(client);

module.exports.init = async (token) => {

    client.userBaseDirectory = __dirname;

     await client.login(config.token);

    return client;

}


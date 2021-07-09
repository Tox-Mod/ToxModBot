require('module-alias/regsiter');

const { Client, Collection } = require('discord.js');
const client = new Discord.Client({ 
    disableEveryone: true, 
    disabledEvents: ['TYPING_START']
});

const config = require('@Settings/config');
const BotListData = require('@Settings/botlists');
const AdminUserData = require('@Settings/users');

client.commands = new Collection();
client.aliases = new Collection();

client.limits = new Map();
client.snipe = new Set();

client.config = config;

const commands = require('@Structure/commands');
const events = require('@Structure/events');

commands.run(client);
events.run(client);

client.login(config.token);


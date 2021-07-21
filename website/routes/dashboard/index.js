const route = require("express").Router();
const Discord = require('discord.js');
const { renderPage } = require('@Templates/renderPage');
const { checkAuth } = require('@Authorization/checkAuth');
const { checkMaintenance } = require('@Authorization/checkMaintenance');
const SERVERS = require('@Database/servers');

/**
 * GET METHOD
 */
route.get("/", checkAuth, async (req, res) => {

    let manageArray = [];
    
    let guilds = req.app.get('client').guilds.cache;

    if (req.user) {
        req.user.guilds.forEach(async (guild) => {
          const permsOnGuild = new Discord.Permissions(guild.permissions);
            if (permsOnGuild.has('MANAGE_GUILD')) {
              manageArray.push({
                guild: guild,
              });
            }
          });

        manageArray.sort((a, b) => (a === b ? 0 : a ? -1 : 1));
    }

    let data = {
        perms: Discord.Permissions,
        guilds: manageArray
    }

    renderPage(res, req, 'dashboard/index', data);
});

module.exports = route;

const route = require("express").Router();
const Discord = require('discord.js');
const renderPage = require('@Templates/renderPage');
const { checkAuth } = require('@Authorization/checkAuth');

/**
 * GET METHOD
 */
route.get("/", checkAuth, async (req, res) => {

    renderPage(res, req, 'dashboard/index', { perms: Discord.Permissions, DisUser: req.isAuthenticated() });
});

module.exports = route;
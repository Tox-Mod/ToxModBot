const route = require("express").Router();
const Discord = require('discord.js');
const { renderPage } = require('@Templates/renderPage');
const { checkAuth } = require('@Authorization/checkAuth');
const { checkMaintenance } = require('@Authorization/checkMaintenance');
const SERVERS = require('@Database/servers');

/**
 * GET METHOD
 */
route.get("/:guildID", checkAuth, checkMaintenance, async (req, res) => {

  const guild = await req.app.get('client').guilds.cache.get(req.params.guildID);

  if (!guild) return res.redirect('/dashboard');

  const member = await guild.members.cache.get(req.user.id);

  if (!member) return res.redirect('/dashboard');

  if (!member.permissions.has('MANAGE_GUILD')) return res.redirect('/dashboard');

  var storedSettings = await SERVERS.findOne({ guildID: guild.id });

  if (!storedSettings) {

    const newSettings = new SERVERS({
      antispam: "0",
      maxwarns: "3",
      guildID: guild.id,
      mutedrole: "String",
      prefix: "tox.",
      welcome: "String",
      leave: "String",
      audit: "String",
      autorole: "String",
      antiraid: "0",
      welcomemsg: "String",
      leavemsg: "String",
      private: "String",
      botautorole: "String",
    })

    await newSettings.save().catch(() => {});

    storedSettings = await SERVERS.findOne({ guildID: guild.id });
  }

  let data = {
    guild, 
    settings: storedSettings, 
    alert: null, 
    error: null 
  }

  renderPage(res, req, 'dashboard/automod', data)
});

/**
 * POST METHOD
 */
 route.post("/:guildID", checkAuth, async (req, res) => {

  const guild = await req.app.get('client').guilds.cache.get(req.params.guildID);

  if (!guild) return res.redirect('/dashboard');

  const member = guild.members.cache.get(req.user.id);

  if (!member) return res.redirect('/dashboard');

  if (!member.permissions.has('MANAGE_GUILD')) return res.redirect('/dashboard');

  var storedSettings = await SERVERS.findOne({ guildID: guild.id });

  if (!storedSettings) {

    const newSettings = new SERVERS({
      antispam: "0",
      maxwarns: "3",
      guildID: guild.id,
      mutedrole: "String",
      prefix: "tox.",
      welcome: "String",
      leave: "String",
      audit: "String",
      autorole: "String",
      antiraid: "0",
      welcomemsg: "String",
      leavemsg: "String",
      private: "String",
      botautorole: "String",
    })

    await newSettings.save().catch(() => {});

    storedSettings = await SERVERS.findOne({ guildID: guild.id });
  }

  if (req.body.antispam) {

    if (req.body.antispam == "Disabled") {

      storedSettings.antispam = "0"

      storedSettings.save().catch(() => {});
    
    } else {

      storedSettings.antispam = req.body.antispam

      storedSettings.save().catch(() => {});
    }
  }

  if (req.body.antiraid) {

    if (req.body.antiraid == "Disabled") {

      storedSettings.antiraid = "0"

      storedSettings.save().catch(() => {});
    
    } else {

      storedSettings.antiraid = req.body.antiraid

      storedSettings.save().catch(() => {});
    }
  }

  await storedSettings.save().catch(() => {})

  let data = {
    guild, settings: 
    storedSettings, 
    alert: "Successfully Updated your Guilds Auto-Mod Settings",
    error: null
  }

  renderPage(res, req, 'dashboard/automod', data)

});

module.exports = route;

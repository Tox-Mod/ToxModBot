const route = require("express").Router();
const Discord = require('discord.js');
const { renderPage } = require('@Templates/renderPage');
const { checkAuth } = require('@Authorization/checkAuth');

const SERVERS = require('@Database/servers');
const USERS = require('@Database/users');
const CLOCK = require('@Database/clock');
const CASES = require('@Database/cases');
const ERRORS = require('@Database/errors');
const TICKETS = require('@Database/tickets');

/**
 * GET METHOD
 */
route.get("/:guildID", checkAuth, async (req, res) => {

    let alertmsg = '';
    let errormsg = '';

    const guild = req.app.get('client').guilds.cache.get(req.params.guildID);

    if (!guild) return res.redirect("/dashboard");

    const member = guild.members.cache.get(req.user.id);

    if (!member) return res.redirect("/dashboard");

    if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/dashboard");

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
      });
      await newSettings.save().catch(()=>{});

      storedSettings = await SERVERS.findOne({ guildID: guild.id });

    }

    let data = {
        guild,
        settings: storedSettings,
        alert: null,
        error: null
    }

      renderPage(res, req, 'dashboard/roles', data);
});

/**
 * POST METHOD
 */
route.post('/:guildID', checkAuth, async (req, res, next) => {

    let alertmsg = '';
    let errormsg = '';

    const guild = req.app.get('client').guilds.cache.get(req.params.guildID);

    if (!guild) return res.redirect("/dashboard");

    const member = guild.members.cache.get(req.user.id);

    if (!member) return res.redirect("/dashboard");

    if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/dashboard");

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
      });

      await newSettings.save().catch(()=>{});

      storedSettings = await SERVERS.findOne({ guildID: guild.id });

    }
                                        
    if(req.body.muterolesettings){
    if(req.body.muterolesettings == "None"){
    }else if(req.body.muterolesettings == "remove"){
    storedSettings.mutedrole = "String"
    await storedSettings.save().catch(() => {});
    }else{
    storedSettings.mutedrole = req.body.muterolesettings
    await storedSettings.save().catch(() => {});
    }
  }

  if(req.body.autorole){
    if(req.body.autorole == "None"){
    }else if(req.body.autorole == "remove"){
    storedSettings.autorole = "String"
    await storedSettings.save().catch(() => {});
    }else{
    storedSettings.autorole = req.body.autorole
    await storedSettings.save().catch(() => {});
    }
  }

  if(req.body.botautorole){
    if(req.body.botautorole == "None"){
    }else if(req.body.botautorole == "remove"){
    storedSettings.botautorole = "String"
    await storedSettings.save().catch(() => {});
    }else{
    storedSettings.botautorole = req.body.botautorole
    await storedSettings.save().catch(() => {});
    }
  }

  alertmsg = "Guild settings have been updated!"

  let data = {
      guild,
      settings: storedSettings,
      alert: alertmsg,
      error: errormsg
  }
  
  renderPage(res, req, 'dashboard/roles', data)
})



module.exports = route;

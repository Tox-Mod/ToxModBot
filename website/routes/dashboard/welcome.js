const route = require("express").Router();
const Discord = require('discord.js');
const { renderPage } = require('@Templates/renderPage');
const { checkAuth } = require('@Authorization/checkAuth');
const { checkMaintenance } = require('@Authorization/checkMaintenance');

const SERVERS = require('@Database/servers');
const USERS = require('@Database/users');
const CLOCK = require('@Database/clock');
const CASES = require('@Database/cases');
const ERRORS = require('@Database/errors');
const TICKETS = require('@Database/tickets');
const { Renderer } = require("marked");

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
    
    renderPage(res, req, 'dashboard/welcome', data)
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
    {
    if(req.body.leavechannel){
      if(req.body.leavechannel == "None"){
        storedSettings.leave = "String"
        storedSettings.save().catch(() => {})
      }else{
      storedSettings.leave = req.body.leavechannel
      storedSettings.save().catch(() => {})
      }
  }

  if(req.body.welcomechannel){
    if(req.body.welcomechannel == "None"){
      storedSettings.welcome = "String"
      storedSettings.save().catch(() => {})
    }else{
    storedSettings.welcome = req.body.welcomechannel
    storedSettings.save().catch(() => {})
    }
}

if(!req.body.welcomemsg){
  storedSettings.welcomemsg = "String"
  storedSettings.save().catch(() => {})
}

if(req.body.welcomemsg){
  if(req.body.welcomemsg.length < 10){
    errormsg = "Welcome msg can't be less than 10 letters"
    return renderPage(res, req, 'dashboard/welcome', { guild, settings: storedSettings, alert: `${alertmsg}`, error: `${errormsg}` });
  }else if(req.body.welcomemsg.length > 500){
    errormsg = "welcome msg can't be more than 500 letters"
    return renderPage(res, req, 'dashboard/welcome', { guild, settings: storedSettings, alert: `${alertmsg}`, error: `${errormsg}` });
  }else{
  storedSettings.welcomemsg = req.body.welcomemsg
  storedSettings.save().catch(() => {})
  }
}

if(!req.body.leavemsg){
storedSettings.leavemsg = "String"
storedSettings.save().catch(() => {})
}

if(req.body.leavemsg){
 if(req.body.leavemsg.length < 10){
    errormsg = "Leave msg can't be less than 10 letters"
    return renderPage(res, req, 'dashboard/welcome', { guild, settings: storedSettings, alert: `${alertmsg}`, error: `${errormsg}` });
  }else if(req.body.leavemsg.length > 500){
    errormsg = "Leave msg can't be more than 500 letters"
    return renderPage(res, req, 'dashboard/welcome', { guild, settings: storedSettings, alert: `${alertmsg}`, error: `${errormsg}` });
  }else{
  storedSettings.leavemsg = req.body.leavemsg
  storedSettings.save().catch(() => {})
  }
}

if(!req.body.privatemsg){
storedSettings.private = "String"
storedSettings.save().catch(() => {})
}

if(req.body.privatemsg){
if(req.body.privatemsg.length < 10){
   errormsg = "Private welcome msg can't be less than 10 letters"
   return renderPage(res, req, 'dashboard/welcome', { guild, settings: storedSettings, alert: `${alertmsg}`, error: `${errormsg}` });
 }else if(req.body.privatemsg.length > 500){
   errormsg = "Private welcome msg can't be more than 500 letters"
   return renderPage(res, req, 'dashboard/welcome', { guild, settings: storedSettings, alert: `${alertmsg}`, error: `${errormsg}` });
 }else{
 storedSettings.private = req.body.privatemsg
 storedSettings.save().catch(() => {})
 }
}

alertmsg = "Guild Welcome Settings have been updated!"
}

  let data = {
      guild,
      settings: storedSettings,
      alert: alertmsg,
      error: errormsg
  }

    renderPage(res, req, 'dashboard/welcome', data)
})



module.exports = route;

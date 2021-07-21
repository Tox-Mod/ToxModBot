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
        alert: null,
        error: null,
        settings: storedSettings,
        guild
    }

    renderPage(res, req, 'dashboard/others', data)
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
    if(req.body.prefix){
    if(req.body.prefix.length < 1){
       errormsg = "Prefix can't be empty"
      return  renderPage(res, req, 'dashboard/others', { guild, settings: storedSettings, alert: `${alertmsg}`, error: `${errormsg}` });
    }else if(req.body.prefix.length > 5){
     errormsg = "Prefix length can't be more than 5 letters!"
      return  renderPage(res, req, 'dashboard/others', { guild, settings: storedSettings, alert: `${alertmsg}`, error: `${errormsg}` });
    }else{
      storedSettings.prefix = req.body.prefix; 
      if(guild.channels.cache.get(storedSettings.mod)){
        guild.channels.cache.get(storedSettings.mod).send(`✏️ Server prefix has been changed to \`${req.body.prefix}\``)
        }
      // We save the settings.
      await storedSettings.save().catch(() => {});
      }    
    }    

    if(req.body.maxwarns){
    if(req.body.maxwarns.length > 2){
      errormsg = "Max warns is 99"
      return  renderPage(res, req, 'dashboard/others', { guild, settings: storedSettings, alert: `${alertmsg}`, error: `${errormsg}` });
    }else if(isNaN(req.body.maxwarns)){
       errormsg = "Only numbers are allowed at maxwarns"
       return  renderPage(res, req, 'dashboard/others', { guild, settings: storedSettings, alert: `${alertmsg}`, error: `${errormsg}` });
    }else{
      storedSettings.maxwarns = req.body.maxwarns;      // We save the settings.
      await storedSettings.save().catch(() => {});
      }    
    }    

    if(req.body.nickname){
      if(req.body.nickname.length > 25){
        errormsg = "Nickname can't be longer than 25 letter!"
        return  renderPage(res, req, 'dashboard/others', { guild, settings: storedSettings, alert: `${alertmsg}`, error: `${errormsg}` });
      }else{
        guild.me.setNickname(req.body.nickname)
        }    
      }             
     
    alertmsg = "Guild settings have been updated!"
  }            

    let data = {
        guild,
        settings: storedSettings,
        alert: alertmsg,
        error: errormsg
    }

    renderPage(res, req, 'dashboard/others', data)
})



module.exports = route;

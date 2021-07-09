const route = require("express").Router();
const Discord = require('discord.js');
const { renderPage } = require('@Templates/renderPage');
const { checkAuth } = require('@Authorization/checkAuth');

const SERVERS = require('@Database/servers');

/**
 * GET METHOD
 */
route.get("/:guildID", checkAuth, async (req, res) => {

    let alertmsg = '';
    let errormsg = '';

    const guild = req.app.get('client').guilds.cache.get(req.params.guildID);

    if (!guild) {

        errormsg = 'Guild not found, Please try again or make sure Tox Mod is a member with sufficient perms.'

        let data = {
            alert: alertmsg,
            error: errormsg
        }

        return renderPage(res, req, 'guild/settings', data);
    }

    const member = guild.members.cache.get(req.user.id);

    if (!member) {

        errormsg = 'You are not an active member of this guild or are higher then the bot in the Role Hierarchy.'

        let data = {
            guild,
            alert: alertmsg,
            error: errormsg
        }

        return renderPage(res, req, 'guild/settings', data);
    }

    if (!member.permissions.has('MANAGE_GUILD')) {

        errormsg = "You don't have MANAGE_GUILD permissions in that server."

        let data = {
            guild,
            alert: alertmsg,
            error: errormsg
        }

        return renderPage(res, req, 'guild/settings', data);
    }

    let StoredGuild = await SERVERS.findOne({ guildID: guild.id });

    if (!StoredGuild) {

        const NewGuild = new SERVERS({
            antispam: '0',
            maxwarns: '3',
            guildID: guild.id,
            mutedrole: 'String',
            prefix: 'tox.',
            welcome: 'String',
            leave: 'String',
            audit: 'String',
            autorole: 'String',
            antiraid: '0',
            welcomemsg: 'String',
            leavemsg: 'String',
            private: 'String',
            botautorole: 'String'
        });

        await NewGuild.save().catch(() => {});

        StoredGuild = await SERVERS.findOne({ guildID: guild.id });
    }

    const cases = await CASES.find({ serverID: guild.id }, { _id: false, auth: false });
    cases.filter(cases => cases)

    let data = {
        guild,
        infractions: cases,
        settings: StoredGuild,
        alert: alertmsg,
        error: errormsg
    }

    renderPage(res, req, 'guild/settings', data);
    
});

/**
 * POST METHOD
 */
 route.post("/:guildID", checkAuth, async (req, res) => {

    let alertmsg = '';
    let errormsg = '';

    const guild = req.app.get('client').guilds.cache.get(req.params.guildID);

    if (!guild) {

        errormsg = 'Guild not found, Please try again or make sure Tox Mod is a member with sufficient perms.'

        let data = {
            alert: alertmsg,
            error: errormsg
        }

        return renderPage(res, req, 'guild/settings', data);
    }

    const member = guild.members.cache.get(req.user.id);

    if (!member) {

        errormsg = 'You are not an active member of this guild or are higher then the bot in the Role Hierarchy.'

        let data = {
            guild,
            alert: alertmsg,
            error: errormsg
        }

        return renderPage(res, req, 'guild/settings', data);
    }

    if (!member.permissions.has('MANAGE_GUILD')) {

        errormsg = "You don't have MANAGE_GUILD permissions in that server."

        let data = {
            guild,
            alert: alertmsg,
            error: errormsg
        }

        return renderPage(res, req, 'guild/settings', data);
    }

    let StoredGuild = await SERVERS.findOne({ guildID: guild.id });

    if (!StoredGuild) {

        const NewGuild = new SERVERS({
            antispam: '0',
            maxwarns: '3',
            guildID: guild.id,
            mutedrole: 'String',
            prefix: 'tox.',
            welcome: 'String',
            leave: 'String',
            audit: 'String',
            autorole: 'String',
            antiraid: '0',
            welcomemsg: 'String',
            leavemsg: 'String',
            private: 'String',
            botautorole: 'String'
        });

        await NewGuild.save().catch(() => {});

        StoredGuild = await SERVERS.findOne({ guildID: guild.id });
    }

    await StoredGuild,save().catch(() => {});

    if (req.body.leaveserver) {

        req.app.get('client').guilds.cache.get(req.body.leaveserver).leave();

        return res.redirect('/');
    }

    const cases = await CASES.find({ serverID: guild.id })
    cases.filter(cases => cases);

    let data = {
        guild,
        infractions: cases,
        settings: StoredGuild,
        alert: 'Successfully removed the bot.',
    }

    renderPage(res, req, 'guild/setttings', data);

 });

module.exports = route;
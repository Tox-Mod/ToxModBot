const route = require("express").Router();
const { MessageEmbed, Discord } = require('discord.js');
const { renderPage } = require('@Templates/renderPage');
const { checkAuth } = require('@Authorization/checkAuth');

const SERVERS = require('@Database/servers');
const USERS = require('@Database/users');
const CLOCK = require('@Database/clock');
const CASES = require('@Database/cases');
const ERRORS = require('@Database/errors');
const TICKETS = require('@Database/tickets');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

/**
 * GET METHOD
 */
route.get("/:guildID", checkAuth, async (req, res) => {

    const guild = req.app.get('client').guilds.cache.get(req.params.guildID);

    if (!guild) return res.redirect('/dashboard');

    const member = guild.members.cache.get(req.user.id);

    if (!member) return res.redirect('/dashboard');

    if (!member.permissions.has('MANAGE_GUILD')) return res.redirect('/dashboard');

    var storedGuild =  await SERVERS.findOne({ guildID: guild.id });

    if (!storedGuild) {

        const newGuild = new SERVERS({
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

        await newGuild.save().catch(() => {});

        storedGuild = await SERVERS.findOne({ guildID: guild.id });
    }

    const caseres = await CASES.find({ serverID: req.params.guildID }, { _id: false, auth: false });

    caseres.filter(cases => cases)

    let data = {
        guild,
        cases: caseres,
        settings: storedGuild,
        alert: null,
        error: null
    }

    renderPage(res, req, 'dashboard/actions', data)
    
});

/**
 * POST METHOD
 */
 route.post("/:guildID", checkAuth, async (req, res) => {

    let alertmsg = '';
    let errormsg = '';

    const guild = req.app.get('client').guilds.cache.get(req.params.guildID);

    if (!guild) return res.redirect('/dashboard');

    const member = guild.members.cache.get(req.user.id);

    if (!member) return res.redirect('/dashboard');

    if (!member.permissions.has('MANAGE_GUILD')) return renderPage(res, req, 'dashboard/index', { guild, alert: null, error: 'You do not have Sufficient Permissions to perform this action.'});

    var storedGuild = await SERVERS.findOne({ guildID: req.params.guildID });

    if (! storedGuild) {

        const newGuild = new SERVERS({
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

        await newGuild.save().catch(() => {});

        storedGuild = await SERVERS.findOne({ guildID: guild.id });
    }

    if (req.body.deletecase) {

        CASES.findOneAndDelete({ serverID: req.params.guildID, case: req.body.deletecase }, (err, res) => {

            if (!res) {
            
                errormsg = `Hmm, Something went wrong deleting that case!`
            
            } else {
            
                if (guild.channels.cache.get(storedGuild.mod)) {

                    let CaseDeleteEmbed = new MessageEmbed()
                      .setTitle('Action: Case Deleted')
                      .setColor(Colors.Error)
                      .setDescription(`${req.user.username} Has deleted Case #${req.body.deletecase}`)
                      .setTimestamp()
                      .setFooter(Embeds.Footer, Images.Animated)

                    guild.channels.cache.get(storedGuild.mod).send(CaseDeleteEmbed);
                }

                alertmsg = `Successfully deleted Case Number: ${req.body.deletecase}`
            }
        })
    }

    const caseres = await CASES.find({ serverID: req.params.guildID }, { _id: false, auth: false });

    caseres.filter(cases => cases);

    let data = {
        guild,
        cases: caseres,
        settings: storedGuild,
        alert: alertmsg,
        error: errormsg
    }

    renderPage(res, req, 'dashboard/actions', data);
    
});


module.exports = route;
const route = require("express").Router();
const { MessageEmbed } = require('discord.js');
const { checkAuth } = require('@Authorization/checkAuth');
const { renderPage } = require('@Templates/renderPage');
const config = require('@Settings/config')

const SERVERS = require('@Database/servers');
const USERS = require('@Database/users');
const CLOCK = require('@Database/clock');
const CASES = require('@Database/cases');
const ERRORS = require('@Database/errors');
const TICKETS = require('@Database/tickets');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

const { render } = require("ejs");

const ratelimit = new Set()

route.get("/", checkAuth, async (req, res) => {

     renderPage(res, req, "reports/bugs", {alert: null, error: null})
});

route.post("/", checkAuth, async (req, res) => {

    let alertmsg = '';
    let errormsg = '';

    if (ratelimit.has(req.user.id + "bug")) {
        errormsg = "Ratelimited, Try again in 1 Minute"
    } else {
        if (req.body.reportbug.length > 500) {
            errormsg = "Max Characters Exceeded (Limit: 500)"
        } else if (req.body.reportbug.length < 25) {
            errormsg = "Brief Description of the Bug should be more then 25 Characters!"
        } else {
            ratelimit.add(req.user.id + "bug")

            const newBug = new ERRORS({
                userID: req.user.id,
                bug: req.body.reportbug
            });

            newBug.save().catch(() => {});

            let BugEmbed = new MessageEmbed()
             .setTitle('New Bug Report')
             .setColor(Colors.Error)
             .setDescription(`${req.body.reportbug}`)
             .addField('Submitted By', `${req.user.username}#${req.user.discriminator}`, true)
             .addField('User ID', `${req.user.id}`, true)
             .addField('User Profile', `https://discordapp.com/users/${req.user.id}`, true)
             .setTimestamp()
             .setFooter(Embeds.Footer, Images.Animated)

             await req.app.get('client').guilds.cache.get(config.SupportGuild).channels.cache.get(config.BugLogs).send(BugEmbed).catch((error) => {
                 console.log(`[Tox Mod | Web] Stacktrace: ${error}`)
             });

            alertmsg = "Your report has been submitted to our Dev Team!"

            setTimeout(() => {
                ratelimit.delete(req.user.id + "bug")
            }, 60000)
        }
    }

    let data = {
        alert: alertmsg,
        error: errormsg
    }

    renderPage(res, req, 'reports/bugs', data)
})

module.exports = route;
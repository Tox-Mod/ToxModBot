const route = require("express").Router();
const Discord = require('discord.js');
const { renderPage } = require('@Templates/renderPage');
const { checkAuth } = require('@Authorization/checkAuth');
const config = require('@Settings/config');

const SERVERS = require('@Database/servers');
const USERS = require('@Database/users');
const CLOCK = require('@Database/clock');
const CASES = require('@Database/cases');
const ERRORS = require('@Database/errors');
const TICKETS = require('@Database/tickets');

/**
 * GET METHOD
 */
route.get("/", checkAuth, async (req, res) => {

    if (!config.owners.includes(req.user.id)) return res.redirect('/nope');

    const bugres = await ERRORS.find({}, { _id: false, auth: false })

    bugres.filter(bug => bug)

    let data = {
        alert: null, 
        error: null, 
        reportbug: bugres
    }

    renderPage(res, req, 'admin/panel', data)

});

/**
 * POST METHOD
 */
 route.post("/", checkAuth, async (req, res) => {

    if (!config.owners.includes(req.user.id)) return res.redirect('/nope');

    let alertmsg = ""
    let errormsg = ""

    if (req.body.commandreload) {

        try {
            delete require.cache[require.resolve(require(`@Cmds/${req.body.commandreload}.js`))]

            client.commands.delete(req.body.commandreload)

            const pull = require(`@Cmds/${req.body.commandreload}.js`)

            client.commands.set(req.body.commandreload, pull)

            alertmsg = `Reloaded the ${req.body.commandreload} Command Successfully!`
        
        } catch (err) {

            errormsg = `Failed to reload the ${req.body.commandreload} Command!`
        }
    } else if (req.body.acceptbug) {

        ERRORS.findOneAndDelete({ userID: req.body.acceptbug }, (err, res) => {

            if (!res) {
                errormsg = `Error occured while accepting the bug, Please try again!`
            } else {
                alertmsg = `Successfully accepted the bug and marked it as Fixed!`
            }
        })
    }

    const bugres = await ERRORS.find({}, { _id: false, auth: false })
    bugres.filter(bug => bug)

    let data = {
        alert: alertmsg, 
        error: errormsg, 
        reportbug: bugres
    }

    renderPage(res, req, 'admin/panel', data)

});

module.exports = route;
const route = require("express").Router();
const { checkAuth } = require('@Authorization/checkAuth');
const { renderPage } = require('@Templates/renderPage');
const config = require('@Settings/config')

const SERVERS = require('@Database/servers');
const USERS = require('@Database/users');
const CLOCK = require('@Database/clock');
const CASES = require('@Database/cases');
const ERRORS = require('@Database/errors');
const TICKETS = require('@Database/tickets');
const { render } = require("ejs");

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

    renderPage(res, req, 'reports/bug', data)
})

module.exports = route;
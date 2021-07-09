const route = require("express").Router();
const ERRORS = require('@Database/errors')
const { renderPage } = require('@Templates/renderPage');
const { checkAuth } = require('Authorization/checkAuth');

const ratelimit = new Set()

/**
 * BUG REPORTS GET METHOD
 */
route.get("/", checkAuth, async (req, res) => {

    let data = {
        alert: null,
        error: null
    }

    renderPage(res, req, "reports/bug", data)
});

/**
 * BUG REPORTS POST METHOD
 */
route.post("/", checkAuth, async (req, res) => {

    let alertmsg = "";
    let errormsg = "";

    if (ratelimit.has(req.user.id + 'bug')) {

        errormsg = "[Ratelimited] You are reporting bugs too fast. Try again later"
    } else {

        if (req.body.reportbug.length > 500) {

            errormsg = "[Form Error] Max characters exceeded! (Max: 500)"
        } else if (req.body.reportbug.length < 25) {

            errormsg = "[Form Error] Brief Bug Report should be more then 25 Characters!"
        } else {

            ratelimit.add(req.user.id + 'bug');

            const newbug = await new ERRORS({
                userID: req.user.id,
                bug: req.body.reportbug
            });

            newbug.save().catch(() => {});

            alertmsg = "[Success] Your Bug Report has been submitted and will be reviewed by our Dev Team shortly."

            setTimeout(() => {

                ratelimit.delete(req.user.id + 'bug')

            }, 60000);
        }
    }

    let data = {
        alert: alertmsg,
        error: errormsg
    }

    renderPage(res, req, 'reports/bug', data);

});

module.exports = route;
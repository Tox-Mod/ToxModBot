const route = require("express").Router();
const renderPage = require('@Templates/renderPage');
const { checkAuth } = require('@Authorization/checkAuth');

const SERVERS = require('@Database/servers');
const USERS = require('@Database/users');
const CLOCK = require('@Database/clock');
const CASES = require('@Database/cases');
const ERRORS = require('@Database/errors');
const TICKETS = require('@Database/tickets');

/**
 * GET METHOD FOR USER PROFILES
 */
route.get("/:userID", checkAuth, async (req, res) => {

    let users = await USERS.findOne({ userID: req.params.userID });
    let Cached = await req.app.get('client').users.cache.get(req.params.userID);

    USERS.findOne({ userID: req.params.userID }, async (err, res) => {

        if (!res) {

            await new USERS({
                userID: req.params.userID,
                bio: 'This person has not set a bio, They must be pretty Lame!'
            }).save();
        }
    })

    let infractions = await CASES.find({ userID: req.params.userID });

    let data = {
        cases: infractions,
        profile: users,
        cachedUser: Cached,
        bio: users.bio,
        alert: null,
        error: null
    }
    
    renderPage(res, req, 'user/user', data)
});

module.exports = route;
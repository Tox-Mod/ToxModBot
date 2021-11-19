const route = require("express").Router();
const { renderPage } = require('@Templates/renderPage');
const { checkAuth } = require('@Authorization/checkAuth');

const SERVERS = require('@Database/servers');
const USERS = require('@Database/users');
const CLOCK = require('@Database/clock');
const CASES = require('@Database/cases');
const ERRORS = require('@Database/errors');
const TICKETS = require('@Database/tickets');
const { render } = require("ejs");

/**
 * GET METHOD FOR USER PROFILES
 */
route.get("/", checkAuth, async (req, res) => {

    let users = await USERS.findOne({ userID: req.user.id });

    let cachedUser = req.app.get('client').users.cache.get(req.user.id);

    USERS.findOne({ userID: req.user.id }, async (err, res) => {

        if (!res) {

            await new USERS({
                userID: req.user.id,
                bio: 'This person has not set a bio, They must be pretty Lame!'
            }).save();
        }
    })

    let infractions = await CASES.find({ userID: req.user.id });

    let data = {
        cachedUser: cachedUser,
        cases: infractions,
        profile: users,
        alert: null,
        error: null
    }
    
    renderPage(res, req, 'user/edit', data)
});

/**
 * POST METHOD FOR USER PROFILES
 */
route.post("/", checkAuth, async (req, res) => { 

    let users = await USERS.findOne({ userID: req.user.id });

    let cachedUser = req.app.get('client').users.cache.get(req.user.id);
    
    let alertmsg = '';
    let errormsg = '';

    USERS.findOne({ userID: req.user.id}, async (err, res) => {

        if (!res) {

            await new USERS({
                userID: req.user.id,
                bio: req.body.changebio || 'This person has not set a bio, They must be pretty Lame!'
            }).save();
        }
    })

    let infractions = await CASES.find({ userID: req.user.id });

    if (!req.body.bio) errormsg = 'Error: `BIO` is a required field. Please update all fields, You can put `NULL` if you have to xD'
    if (!req.body.github) errormsg = 'Error: `GITHUB` is a required field. Please update all fields, You can put `NULL` if you have to xD'
    if (!req.body.twitter) errormsg = 'Error: `TWITTER` is a required field. Please update all fields, You can put `NULL` if you have to xD'
    if (!req.body.instagram) errormsg = 'Error: `INSTAGRAM` is a required field. Please update all fields, You can put `NULL` if you have to xD'
    if (!req.body.website) errormsg = 'Error: `WEBSITE` is a required field. Please update all fields, You can put `NULL` if you have to xD'

    await USERS.findOneAndUpdate({
        userID: req.user.id
    }, {
        $set: {
            bio: req.body.bio,
            website: req.body.website,
            github: req.body.github,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
        }
    }, {
        upsert: true
    })

    alertmsg = 'Your profile has been updated!'

    let data = {
      cachedUser: cachedUser,
      cases: infractions,
      profile: users,
      alert: alertmsg,
      error: errormsg
    }

    return renderPage(res, req, 'user/edit', data);
});

module.exports = route;

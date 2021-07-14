const route = require("express").Router();
const { renderPage } = require('@Templates/renderPage');
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
route.get("/", checkAuth, async (req, res) => {

    let users = await USERS.findOne({ userID: req.user.id });

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
        cases: infractions,
        profile: users,
        bio: users.bio,
        alert: null,
        error: null
    }
    
    renderPage(res, req, 'user/profile', data)
});

/**
 * POST METHOD FOR USER PROFILES
 */
route.post("/", checkAuth, async (req, res) => {

    let users = await USERS.findOne({ userID: req.user.id });
    
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

    if (req.body.changebio) {

        if (req.body.changebio.length > 50) {

            errormsg = '[Bio Error] Can not be more then 50 characters!'

            let data = {
                cases: infractions,
                profile: users,
                bio: users.bio,
                alert: alertmsg,
                error: errormsg
            }

            return renderPage(res, req, 'user/profile', data);

        } else if (req.body.changebio.length < 10) {

            errormsg = '[Bio Error] Can not be shorter then 10 characters!'

            let data = {
                cases: infractions,
                profile: users,
                alert: alertmsg,
                error: errormsg
            }

            return renderPage(res, req, 'user/profile', data);

        } else {

            if (users) {

                users.bio = req.body.changebio

                await users.save();

                alertmsg = '[Success] Your bio has been updated!'

                users = await USERS.findOne({ userID: req.user.id });

                let data = {
                    cases: infractions,
                    profile: users,
                    bio: req.body.changebio,
                    alert: alertmsg,
                    error: errormsg
                }

                return renderPage(res, req, 'user/profile', data);
            } else {

                users = await USERS.findOne({ userID: req.user.id });

                alertmsg = '[Success] Your bio has been updated!'

                let data = {
                    cases: infractions,
                    profile: users,
                    bio: users.bio,
                    alert: alertmsg,
                    error: errormsg
                }
            }
        }
    }

        if (req.body.captcha == "delete") {

            if (req.body.userdelete) {

                if (!users) {

                    errormsg = "[Database Error] You don't have any Data stored on our website!"

                    let data = {
                        cases: infractions,
                        profile: users,
                        bio: users.bio,
                        alert: alertmsg,
                        error: errormsg
                    }

                    return renderPage(res, req, 'user/profile', data);
                } else {

                    await USERS.findOneAndDelete({ userID: req.user.id });

                    alertmsg = '[Success] Your data has been deleted!'

                    users = await USERS.findOne({ userID: req.user.id });

                    let data = {
                        cases: infractions,
                        profile: users,
                        bio: users.bio,
                        alert: alertmsg,
                        error: errormsg
                    }

                    return await renderPage(res, req, 'user/profile', data);
                }
            }
        } else {

            errormsg = "[Client Error] You didn't complete the captcha!"

            let data = {
                cases: infractions,
                profile: users,
                bio: users.bio,
                alert: alertmsg,
                error: errormsg
            }

            return renderPage(res, req, 'user/profile', data);
        }

        let data = {
            cases: infractions,
            profile: users,
            bio: users.bio,
            alert: alertmsg,
            error: errormsg
        }

        renderPage(res, req, 'user/profile', data);
});

module.exports = route;
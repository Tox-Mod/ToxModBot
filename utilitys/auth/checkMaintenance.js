const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const config = require('@Settings/config');
const path = require('path');
const app = express();

module.exports.checkMaintenance = async (req, res, next) => {

    if (config.maintenace === 'true') {

        if (req.isAuthenticated() || req.user) {

            let usercheck = await req.app.get('client').guilds.cache.get(config.SupportGuild).members.cache.get(req.user.id);

            if (usercheck) { 
                if (usercheck.roles.cache.get('807394913880244224')) {
                    next();
                } else {
                    res.redirect('/brb')
                }
            } else {
                res.redirect('/brb')
            }
        } else {
            res.redirect('/brb')
        }
    } else {
        next();
    }
}

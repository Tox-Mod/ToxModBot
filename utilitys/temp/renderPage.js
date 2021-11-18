const config = require('@Settings/config')
const router = require("express").Router();
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const path = require('path');

const templateDir = path.resolve(`${process.cwd()}${path.sep}website/views`);

module.exports.renderPage = async (res, req, template, data = {}) => {

    router.use(passport.initialize());
    router.use(passport.session());

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));

    let client = await req.app.get('client');
    //let user = await req.isAuthenticated() ? client.users.cache.get(req.user.id) : null;
    let user = await req.isAuthenticated() ? req.user : null;

    const baseData = {
        bot: client,
        path: req.path,
        user: user,
        theme: req.cookies.theme, 
        config: config,
        headerPath: `${templateDir}${path.sep}parts/header`,
        footerPath: `${templateDir}${path.sep}parts/footer`,
        navbarPath: `${templateDir}${path.sep}parts/navbar`,
        sidenavPath: `${templateDir}${path.sep}parts/sideNav`,
        guildSideNav: `${templateDir}${path.sep}parts/guildSideNav`,
        notifyAlerts: `${templateDir}${path.sep}others/notification`
    };

        res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
};
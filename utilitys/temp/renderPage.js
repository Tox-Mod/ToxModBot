const config = require('@Settings/config')
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const path = require('path');

const templateDir = path.resolve(`${process.cwd()}${path.sep}website/views`);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports.renderPage = async (res, req, template, data = {}) => {

    let client = await req.app.get('client');

    const baseData = {
        bot: client,
        path: req.path,
        user: req.isAuthenticated() ? req.app.get('client').users.fetch(req.user.id) : null,
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
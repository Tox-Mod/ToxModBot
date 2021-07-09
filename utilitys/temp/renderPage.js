const config = require('@Settings/config')
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const path = require('path');

const templateDir = path.resolve(`${process.cwd()}${path.sep}website/views`);

async function renderPage(res, req, template, data = {}) {

    let client = await req.app.get('client');

    let user = await req.isAuthenticated() ? req.app.get('client').users.cache.get(req.user.id) : null

    
    const baseData = {
        bot: client,
        path: req.path,
        user: user,
        config: config,
        headerPath: `${templateDir}${path.sep}parts/header`,
        footerPath: `${templateDir}${path.sep}parts/footer`,
        navbarPath: `${templateDir}${path.sep}parts/navbar`,
        notifyAlerts: `${templateDir}${path.sep}others/notification`
    };

        res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
};
      
module.exports = renderPage;
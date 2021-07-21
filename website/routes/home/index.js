const route = require("express").Router();
const { renderPage } = require('@Templates/renderPage');
const { checkAuth } = require('@Authorization/checkAuth');
const { checkMaintenance } = require('@Authorization/checkMaintenance');

const passport = require("passport");
const Strategy = require("passport-discord").Strategy;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

route.get("/", checkMaintenance, async (req, res) => {

   let user;

    if (req.user) user = req.user
    else user = null


     let data = {
       alert: null,
       error: null,
       user
     };

     renderPage(res, req, 'index', data)
});

module.exports = route;
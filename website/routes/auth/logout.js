const route = require("express").Router();
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const { renderPage } = require('@Templates/renderPage');

route.get("/", function (req, res) {

    req.session.destroy(() => {

        req.logout();

        res.redirect('/');
    });
});

module.exports = route;
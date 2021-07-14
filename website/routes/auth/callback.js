const route = require("express").Router();
const session = require("express-session");
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const { MessageEmbed } = require("discord.js");
const { renderPage } = require('@Templates/renderPage');
const config = require('@Settings/config');
const path = require("path");

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

route.use(passport.initialize());
route.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

route.get("/", passport.authenticate("discord", { failureRedirect: "/" }), async (req, res) => {

  if (req.session.backURL) {

      const url = req.session.backURL;
  
      req.session.backURL = null;
  
      res.redirect(url);
  
    } else {
  
      res.redirect("/");
    }
});

module.exports = route;
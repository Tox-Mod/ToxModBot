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

  try {

    let avatar = `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}`

    let SuccessLogs = new MessageEmbed()
      .setTitle('Tox Mod | Auth Logs')
      .setColor(Colors.Primary)
      .setThumbnail(avatar)
      .setDescription(`${req.user.username} Logged in Successfully with No Errors!`)
      .addField('Req Path', `${req.path}`, true)
      .addField('Username', `${req.user.username}`, true)
      .addField('User ID', `${req.user.id}`, true)
      .setTimestamp()
      .setFooter(Embeds.Footer, avatar)

      await req.app.get('client').guilds.cache.get(config.SupportGuild).channels.cache.get(config.AuthLogs).send(SuccessLogs).catch((err) => {
        console.log(`[Tox Mod | Web] Stacktrace: ${err}`)
      });

    console.log(`[Tox Mod | Web] Stacktrace: Successful Login from ${req.user.username}`)

  } catch (err) {

    let FailLogs = new MessageEmbed()
     .setTitle('Tox Mod | Auth Logs')
     .setColor(Colors.Error)
     .setThumbnail(avatar)
     .setDescription(`Login Attempt failed, Client not Ready!`)
     .addField('Req Path', `${req.path}`, true)
     .addField('Error Log', `${err}`, true)
     .setTimestamp()
     .setFooter(Embeds.Footer, avatar)

     await req.app.get('client').guilds.cache.get(config.SupportGuild).channels.cache.get(config.AuthLogs).send(FailLogs).catch((err) => {
      console.log(`[Tox Mod | Web] Stacktrace: ${err}`)
    });

    return console.log(`[Tox Mod | Web] Stacktrace: Unsuccessful Login Attempt : ${err}`);
  }

  res.redirect("/");
});

module.exports = route;
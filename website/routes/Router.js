const { MessageEmbed } = require('discord.js');
const { Router } = require("express");
const router = require("express").Router();
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const bodyParser = require("body-parser");
const config = require('@Settings/config');

const { renderPage } = require('@Templates/renderPage');
const { checkAuth } = require('@Authorization/checkAuth');

const Images = require('@Images/index');
const Colors = require('@Colors/index');
const Embeds = require('@Embeds/index');

/**
 * SET AND USE OUR CUSTOM HEADERS
 */
 function customHeaders( req, res, next ){
  res.setHeader( 'X-Powered-By', 'Toxic Development' );
  next()
}

router.use( customHeaders );

/**
 * INITIALIZE THE PASSPORT CLIENT AND STARTEGY
 */
 router.use(passport.initialize());
 router.use(passport.session());

 passport.serializeUser((user, done) => done(null, user));
 passport.deserializeUser((obj, done) => done(null, obj));
 
 passport.use(new Strategy({
       clientID: config.clientID,
       clientSecret: config.clientSecret,
       callbackURL: config.domain,
       scope: ["identify", "guilds",],
     },
     (accessToken, refreshToken, profile, done) => {
       // eslint-disable-line no-unused-vars
       // On login we pass in profile with no logic.
       process.nextTick(() => done(null, profile));
}));

/**
 * ALL THE ROUTES BOII
 */
router.use('/', require('@Routes/home/index'));

router.use('/discord', require('@Routes/redirects/discord'));
router.use('/join', require('@Routes/redirects/discord'));
router.use('/github', require('@Routes/redirects/github'));
router.use('/invite', require('@Routes/redirects/invite'));
router.use('/thanks', require('@Routes/redirects/thanks'));

router.use('/status', require('@Routes/Status'));
router.use('/staff', require('@Routes/Staff'));
router.use('/admin', require('@Routes/admin/panel'));
router.use('/bugs', require('@Routes/reports/bugs'));

router.use('/commands', require('@Routes/bot/commands'));

router.use('/dashboard', require('@Routes/dashboard/Router'));

router.use('/callback', require('@Routes/auth/callback'));
router.use('/login', require('@Routes/auth/login'));
router.use('/logout', require('@Routes/auth/logout'));

router.use('/profile', require('@Routes/users/profile'));
router.use('/me/edit', require('@Routes/users/edit'));
router.use('/user', require('@Routes/users/user'));

router.use('/terms', require('@Routes/legal/terms'));
router.use('/privacy', require('@Routes/legal/privacy'));

router.use('/nope', require('@Routes/errors/staff'));
router.use('/brb', require('@Routes/errors/maintenance'));
router.use('/403', require('@Routes/errors/403'));
router.use('/404', require('@Routes/errors/404'));
router.use('/500', require('@Routes/errors/500'));
 
router.use('/fork/thanks', require('@Routes/host/thanks'));

/**
 * ERROR AND 404 PAGES
 */
 router.use(function (req, res, next) {
  res.status(404).redirect('/404');
});

router.use(async function (error, req, res, next) {

  renderPage(res, req, 'errors/500', {
    status: 500,
    body: error || 'Hmm, I dont know what to tell you chief! Theres nothing wrong'
  });

  let ErrorEmbed = new MessageEmbed()
    .setTitle('500 | Internal Error')
    .setColor(Colors.Error)
    .setDescription(`${error}`)
    .addField('Error Path', `${req.path}`, true)
    .setTimestamp()
    .setFooter(Embeds.Footer, Images.Animated)

  await req.app.get('client').guilds.cache.get(config.SupportGuild).channels.cache.get(config.ErrLogs).send(ErrorEmbed);
                
  return console.log(`[Tox Mod | Web] Error: ${error} Stack: ${error.stack}`)
});

module.exports = router;

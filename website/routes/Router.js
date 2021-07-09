const { Router } = require("express");
const router = require("express").Router();
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const bodyParser = require("body-parser");
const config = require('@Settings/config');

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
       callbackURL: config.localCallback,
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

router.use('/api/user', require('@Routes/api/users'));
//router.use('/api/case', require('@Routes/api/case')); // COMING SOON
//router.use('/api/cases', require('@Routes/api/cases')); // COMING SOON

router.use('/commands', require('@Routes/bot/commands'));

router.use('/dashboard', require('@Routes/dashboard/index'));
router.use('/dashboard', require('@Routes/dashboard/actions'));

router.use('/callback', require('@Routes/auth/callback'));
router.use('/login', require('@Routes/auth/login'));
router.use('/logout', require('@Routes/auth/logout'));

router.use('/profile', require('@Routes/users/profile'));
router.use('/user', require('@Routes/users/user'));

router.use('/terms', require('@Routes/legal/terms'));

router.use('/403', require('@Routes/errors/403'));
router.use('/404', require('@Routes/errors/404'));
router.use('/500', require('@Routes/errors/500'));

/**
 * ERROR AND 404 PAGES
 */
 router.use(function (req, res, next) {
  res.status(404).redirect('/404');
});

router.use(function (error, req, res, next) {
  res.status(500).redirect('/500');
  console.log(error)
});

module.exports = router;
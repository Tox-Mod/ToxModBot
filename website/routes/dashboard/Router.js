const { Router } = require("express");
const router = require("express").Router();
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const bodyParser = require("body-parser");
const config = require('@Settings/config');

/**
 * ALL THE ROUTES BOII
 */
router.use('/', require('@Routes/dashboard/index'));
router.use('/guilds', require('@Routes/dashboard/guild'));
router.use('/actions', require('@Routes/dashboard/actions'));
router.use('/logs', require('@Routes/dashboard/logs'));
router.use('/automod', require('@Routes/dashboard/automod'));
router.use('/others', require('@Routes/dashboard/others'));
router.use('/roles', require('@Routes/dashboard/roles'));
router.use('/welcome', require('@Routes/dashboard/welcome'));


module.exports = router;
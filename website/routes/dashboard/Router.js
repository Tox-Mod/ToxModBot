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


module.exports = router;
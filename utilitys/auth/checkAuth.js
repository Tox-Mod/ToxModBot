const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const path = require('path');
const app = express();

module.exports.checkAuth = async (req, res, next) => {
    
    if (req.isAuthenticated()) return next();
        
    req.session.backURL = req.url;
        
    res.redirect("/login");
}
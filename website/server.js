const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const MongoStore = require("connect-mongo")(session);
const path = require('path');
const app = express();

const settings = require("@Settings/config");
const router = require("@Routes/Router");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Client, Collection } = require("discord.js");

const getFilesSync = require("./fileWalk");

class App {
  constructor(client, locals = {}) {    
    this.express = express();
    
    this.express.set("client", client);
    this.express.set('views', 'views');
    this.express.set("view engine", "ejs");
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(express.static(__dirname + "/public"));
    this.express.use('/images', express.static(__dirname + "/images"));
    this.express.use(passport.initialize());
    this.express.use(passport.session());
    this.express.use(cookieParser());
    this.express.use(session({
      cookie: { maxAge: require("ms")("10 years") },
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      secret: "ToxicDev_Is_Inside_Me",
      resave: false,
      saveUninitialized: false,
    }));
    this.express.locals = locals;
    this
      .loadRoutes()
      .loadErrorHandler();

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));

    passport.use(new Strategy({
      clientID: settings.clientID,
      clientSecret: settings.clientSecret,
      callbackURL: settings.domain,
      scope: ["identify", "guilds",],
    },
    (accessToken, refreshToken, profile, done) => {
      // eslint-disable-line no-unused-vars
      // On login we pass in profile with no logic.
      process.nextTick(() => done(null, profile));
    }));
  }

  listen(port) {
    return new Promise((resolve) => this.express.listen(port, resolve));
  }

  
  loadRoutes() {
    const routesPath = path.join(__dirname, "./routes");
    const routes = getFilesSync(routesPath);

    if (!routes.length) return this;

    routes.forEach((filename) => {
      const route = require(path.join(routesPath, filename));
      
      const routePath = filename === "Router.js" ? "/" : `/${filename.slice(0, -3)}`;

      try {
        this.express.use(routePath, route);
      } catch (error) {
        console.error(`Error occured with the route "${filename}"\n\n${error}`);
      }
    });

    return this;
  }

  
  loadErrorHandler() {
    this.express.use((error, _req, res, _next) => {
      const { message, statusCode = 500 } = error;
      if (statusCode >= 500) console.error(error);

      res.status(statusCode).send({
        message,
        status: statusCode
      });
    });

    return this;
  }
}



module.exports = App;

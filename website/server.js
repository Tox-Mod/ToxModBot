require("module-alias/register");

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

const client = new Client({
  disableEveryone: true,
  disabledEvents: ["TYPING_START"],
  restTimeOffset: 0,
});

client.commands = new Collection();
client.aliases = new Collection();

const commands = require('@Structure/commands');

 commands.run(client);

// Then Discord
client.login(settings.token);

// Discord Client Ready
client.on("ready", async () => {
  console.log(`[Tox Mod | Web] Successfully connected to the Discord API! as ${client.user.username}`);
});


app.disable("server");

// Middleware
app.set("client", client);
app.set('views', 'views');
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
app.use('/images', express.static(__dirname + "/images"));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

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

/**
 * MEMORY STORE
 */
 app.use(
  session({
    cookie: { maxAge: require("ms")("10 years") },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: "CIv+ZgFBk0MSYvDGV8Xge4fZB6xsodqs0BhYs8CxP5g=",
    resave: false,
    saveUninitialized: false
  })
);

// Main Router
app.use("/", router);

app.listen(settings.port, async () => {

  console.log(`[Tox Mod | Web] Listening to the Web Server on Port: ${settings.port}`)
    await mongoose
      .connect(settings.mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
        poolSize: 5,
        connectTimeoutMS: 10000,
        family: 4,
      })
      .then(() =>
        console.log("[Tox Mod | Web] Successfully connected to the Database!")
      );
});

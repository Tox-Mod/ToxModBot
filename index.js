require("module-alias/register");
require("@Client/shards");

const mongo = require("mongoose");
const config = require("@Settings/config");
const colors = require('colors');
const Bot = require('@Client/index'); 
const Website = require('./website/server');


(async (client) => {

    await mongo.connect(config.mongo_url, { 
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    console.log(colors.yellow(`[Tox Mod - Logs] Connected to the database on `) + colors.underline.green(config.mongodb_url));
    
    let client = await Bot.init(config.token);

    console.log(colors.yellow(`[Tox Mod - Logs] Logged in as `) + colors.underline.green(client.user.tag));

    await new Website(client).listen(process.env.PORT);

    console.log(colors.yellow(`[Tox Mod - Logs] Running on port `) + colors.underline.green(process.env.PORT));
})()

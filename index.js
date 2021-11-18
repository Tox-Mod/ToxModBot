require("module-alias/register");

const mongo = require("mongoose");
const config = require("@Settings/config");
const colors = require('colors');
const Bot = require('@Client/index');
const Website = require('./website/server');


(async () => {

    await mongo.connect(config.mongo_url, { 
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    console.log(colors.yellow(`Connected to the database on `) + colors.underline.green(config.mongodb_url));
    
    let client = await Bot.init(config.token);

    console.log(colors.yellow(`Logged in as `) + colors.underline.green(client.user.tag));

    await new Website(client).listen(5579);

    console.log(colors.yellow(`Running on port `) + colors.underline.green(5579));
})()
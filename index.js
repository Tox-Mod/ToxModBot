require("module-alias/register");
const mongo = require("mongoose");

const Website = require('./website/server');
const Client = require('./client/index');
const config = require('@Settings/config');

(async () => {
    
    let client = await Client.init(config.token);

    console.log('[Tox Mod | Bot] Connected to the Discord API');

    await new Website(client).listen(process.env.PORT);

    console.log(`[Tox Mod | Web] Running on port: ${process.env.PORT}`);
})()

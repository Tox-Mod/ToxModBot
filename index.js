require("module-alias/register");
const mongo = require("mongoose");

const Website = require('');
const Client = require('');

(async () => {
    
    let client = await Client.init();

    console.log(`Logged in as ${client.user.tag}`);

    await new Website(client).listen(process.env.PORT);

    console.log(`Tox ing on port `);
})()

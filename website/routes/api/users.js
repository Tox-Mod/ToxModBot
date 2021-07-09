const route = require("express").Router();
const renderPage = require('@Templates/renderPage');
const { checkAuth } = require('@Authorization/checkAuth');

const USERS = require('@Database/users');

const bodyParser = require("body-parser");
const { Client } = require("discord.js");

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended: true}));

route.get("/:userID", async (req, res) => {

    let user = await USERS.findOne({ userID: req.params.userID })

    let ClientUser = await req.app.get('client').users.cache.get(req.params.userID);

    if (!user) return res.status(404).send(JSON.stringify({
        message: 'Unable to find the Proivided User in our Database.',
        error: true,
        status: 404
    }));

    else if (!ClientUser) return res.status(400).send(JSON.stringify({
        message: 'That User does not share a Server with the Bot.',
        error: true,
        status: 400
    }));

    else if (user) return res.status(200).send(JSON.stringify({
        userName: ClientUser.username,
        userID: user.userID,
        about: user.bio 

    }))
});

module.exports = route;
const route = require("express").Router();
const { renderPage } = require('@Templates/renderPage');

route.get("/", async (req, res) => {

    renderPage(res, req, "redirects/invite");
});

module.exports = route;
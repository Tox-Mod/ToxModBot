const route = require("express").Router();
const { renderPage } = require('@Templates/renderPage');

route.get("/", async (req, res) => {

     let data = {
       alert: null,
       error: null
     };

    renderPage(res, req, "errors/403", data)
});

module.exports = route;
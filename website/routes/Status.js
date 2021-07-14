const route = require("express").Router();
const { renderPage } = require('@Templates/renderPage');

route.get("/", async (req, res) => {

     let data = {
       alert: null,
       error: null
     };

     renderPage(res, req, "others/status", data)
});

module.exports = route;
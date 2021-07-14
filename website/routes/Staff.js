const route = require("express").Router();
const { renderPage } = require('@Templates/renderPage');
const config = require('@Settings/config')

route.get("/", async (req, res) => {

     let data = {
       alert: null,
       error: null
     };

     renderPage(res, req, "staff", data)
});

module.exports = route;
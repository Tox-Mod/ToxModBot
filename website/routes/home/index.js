const route = require("express").Router();
const renderPage = require('@Templates/renderPage');
const { checkAuth } = require('@Authorization/checkAuth');

route.get("/", async (req, res) => {


     let data = {
       alert: null,
       error: null
     };

     renderPage(res, req, "index", data)
});

module.exports = route;
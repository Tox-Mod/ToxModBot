const route = require("express").Router();
const { checkAuth } = require('@Authorization/checkAuth');
const { checkMaintenance } = require('@Authorization/checkMaintenance');
const { renderPage } = require('@Templates/renderPage');
const config = require('@Settings/config')

route.get("/", checkMaintenance, async (req, res) => {

     let data = {
       alert: null,
       error: null
     };

     renderPage(res, req, "staff", data)
});

module.exports = route;

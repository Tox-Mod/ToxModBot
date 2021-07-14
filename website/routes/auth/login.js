const url = require("url");
const route = require("express").Router();
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const { renderPage } = require('@Templates/renderPage');

route.get("/", async (req, res, next) => {

  let data = {
    alert: null,
    error: null
  }

  renderPage(res, req, 'auth/login', data);

  });

module.exports = route;
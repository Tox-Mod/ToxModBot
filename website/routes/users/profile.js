const route = require("express").Router();
const { renderPage } = require('@Templates/renderPage');
const { checkAuth } = require('@Authorization/checkAuth');

const SERVERS = require('@Database/servers');
const USERS = require('@Database/users');
const CLOCK = require('@Database/clock');
const CASES = require('@Database/cases');
const ERRORS = require('@Database/errors');
const TICKETS = require('@Database/tickets');

/**
 * GET METHOD FOR USER PROFILES
 */
route.get("/", checkAuth, async (req, res) => {

    let users = await USERS.findOne({ userID: req.user.id });

    let cachedUser = req.app.get('client').users.cache.get(req.user.id);

    USERS.findOne({ userID: req.user.id }, async (err, res) => {

        if (!res) {

            await new USERS({
                userID: req.user.id,
                bio: 'This person has not set a bio, They must be pretty Lame!'
            }).save();
        }
    })

    let infractions = await CASES.find({ userID: req.user.id });

    let data = {
        cachedUser: cachedUser,
        cases: infractions,
        profile: users,
        alert: null,
        error: null
    }
    
    renderPage(res, req, 'user/profile', data)
});

route.post("/", checkAuth, async (req, res) => {

    let users = await USERS.findOne({userID: req.user.id})

    let alertmsg = "";
    let errormsg = "";

    USERS.findOne({userID: req.user.id}, async (err, res) =>{

      if(!res){
        await new USERS({
          userID: req.user.id,
        }).save()
      }
    })

    let infractions = await CASES.find({userID: req.user.id})

    if(req.body.captcha == "delete"){

      if(req.body.requestdelete){

            if(!users){

              errormsg = "You don't have any Stored Data to delete!"

              return renderPage(res, req, "user/profile", {cases: infractions, profile: users, alert: alertmsg, error: errormsg});

          }else{

            await USERS.findOneAndDelete({userID: req.user.id})

            alertmsg = "Your Stored Data has been Deleted!"

            users = await USERS.findOne({userID: req.user.id})

            return await renderPage(res, req, "user/profile", {cases: infractions, profile: users, alert: alertmsg, error: errormsg});
          }
      }

    }else{

        errormsg = "Please confirm that you agree to this request."

        return renderPage(res, req, "user/profile", {cases: infractions, profile: users, alert: alertmsg, error: errormsg});
    }
    
    renderPage(res, req, "user/profile", {cases: infractions, profile: users, alert: alertmsg, error: errormsg});
  });

module.exports = route;

const { Schema, model } = require("mongoose");

module.exports = model(
  "tickets",
  new Schema({
    channelID: { type: String },
    userID: { type: String },
    ticketID: { type: Number },
    logURL: { type: String, default: "" },
    closeUserID: { type: String, default: "" },
    open: { type: Boolean, default: true },
  })
);
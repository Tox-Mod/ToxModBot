const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
  news: {
    type: String,
    required: true,
  },
  tag:{
    type: String,
    required: true,
  },    
 time:{
  type: String,
  required: true,
 }
});

module.exports = mongoose.model('ToxModNews', ClientSchema);

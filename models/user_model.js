const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userschema = new Schema({
  fname: { type: String, required: true, maxlength: 50 },
  lname: { type: String, required: true, maxlength: 50 },
  uname: { type: String, required: true, maxlength: 16 },
  email: { type: String, required: true, maxlength: 50 },
  pword: { type: String, required: true, maxlength: 50 },
});

module.exports = mongoose.model('user_model', userschema);

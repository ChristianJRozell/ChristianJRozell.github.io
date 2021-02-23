const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userschema = new Schema({
  fname: { type: String, required: true, maxlength: 50 },
  lname: { type: String, required: true, maxlength: 50 },
  uname: { type: String, required: true, maxlength: 16, unique: true },
  email: { type: String, required: true, maxlength: 50, unique: true },
  pword: { type: String, required: true, maxlength: 150 },
});

module.exports = mongoose.model('user_model', userschema);

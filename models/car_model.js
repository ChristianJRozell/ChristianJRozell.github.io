const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let carschema = new Schema({
  make: { type: String, required: true, maxlength: 50 },
  model: { type: String, required: true, maxlength: 50 },
  year: { type: String, required: true, maxlength: 50 },
});

module.exports = mongoose.model('car_model', carschema);

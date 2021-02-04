let cars = require('../routes/car_module');
let carmodel = require('../models/car_model');
const { model } = require('mongoose');

exports.car_list = function (req, res, next) {
  // Create an instance of model SomeModel
  var car_instance = new carmodel({
    make: req.body.cars_dropdown,
    model: req.body.model_dropdown,
    year: req.body.year_dropdown,
  });
  // Save the new model instance, passing a callback

  carmodel
    .find({})
    .then()
    .exec(function (err, list_cars) {
      if (err) {
        return next(err);
      }
      let result;

      result = list_cars.map(
        (obj) => `${obj.make + ' ' + obj.model + ' ' + obj.year + '\n'}`
      );
      car_instance.save(function (err) {
        if (err) return err.message;
        // saved!
      });
      //Successful, so render
      res.render('index', { title: 'Car List', list_o_cars: result });
      return car_instance;
    });
};

exports.render_garage = function (req, res, next) {
  carmodel.find({}).exec(function (err, list_cars) {
    if (err) {
      return next(err);
    }
    let result;

    result = list_cars.map(
      (obj) => `${obj.make + ' ' + obj.model + ' ' + obj.year + '\n'}`
    );

    //Successful, so render
    res.render('index', { title: 'Car List', list_o_cars: result });
  });
};

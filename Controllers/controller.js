let cars = require('../routes/car_module');
let carmodel = require('../models/car_model');

exports.car_list = function (req, res, next) {
  // Create an instance of model SomeModel
  var car_instance = new carmodel({
    make: req.body.cars_dropdown,
    model: req.body.model_dropdown,
    year: req.body.year_dropdown,
  });
  console.log(req.body);
  // Save the new model instance, passing a callback
  car_instance.save(function (err) {
    if (err) return err.message;
    // saved!
  });

  carmodel
    .find({}, 'make model year')
    .populate('make')
    .exec(function (err, list_cars) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render('index', { title: 'Car List', car_list: list_cars });
    });
};

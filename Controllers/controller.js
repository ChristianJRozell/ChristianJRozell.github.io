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
  //TODO save car to database
  //Save the data then in the same function run the .then
  car_instance
    .save()

    .then((find_car) => {
      //TODO make a search query for all the cars in the database
      carmodel.find({}).exec(function (err, list_cars) {
        if (err) {
          return next(err);
        }

        let jade_list;

        jade_list = list_cars.map(
          (obj) => `${obj.year + ' ' + obj.make + ' ' + obj.model}`
        );

        res.render('index', { title: 'Car_list', list_o_cars: jade_list });
      });
    })
    .catch((err) => {
      res.status(400).send('Car Failed to Save');
    });

  //TODO display all cars as a response
};

//   // Save the new model instance, passing a callback
// await car_instance.save( function (err) {
//         if (err) return err.message;
//         // saved!
//         return car_instance
//       });
//   carmodel
//     .find({})
//     .then()
//     .exec(function (err, list_cars) {
//       if (err) {
//         return next(err);
//       }
//       let result;

//       result = list_cars.map(
//         (obj) => `${obj.make + ' ' + obj.model + ' ' + obj.year + '\n'}`
//       );

//       //Successful, so render
//       res.render('index', { title: 'Car List', list_o_cars: result });
//       return car_instance;
//     });
// };

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

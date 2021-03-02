let carmodel = require('../models/car_model');
const { model } = require('mongoose');
const user_model = require('../models/user_model');
const bcrypt = require('bcryptjs');

exports.car_list = function (req, res, next) {
  let user = user_model({
    fname: req.body.fname,
    lname: req.body.lname,
    uname: req.body.uname,
    email: req.body.email,
    pword: req.body.pword,
  });
  // Create an instance of model SomeModel
  var car_instance = new carmodel({
    make: req.body.cars_dropdown,
    model: req.body.model_dropdown,
    year: req.body.year_dropdown,
    userId: req.session.userId,
  });
  //TODO save car to database
  //Save the data then in the same function run the .then
  car_instance
    .save()

    .then((find_car) => {
      //TODO make a search query for all the cars in the database
      carmodel
        .find({ userId: req.session.userId })
        .exec(function (err, list_cars) {
          if (err) {
            return next(err);
          }

          let jade_list;

          jade_list = list_cars.map(
            (obj) => `${obj.year + ' ' + obj.make + ' ' + obj.model}`
          );

          res.render('garage', { title: 'Car_list', list_o_cars: jade_list });
        });
    })
    .catch((err) => {
      res.status(400).send('Car Failed to Save');
    });
};

//figure out bcrypt
exports.dash = function (req, res, next) {
  let hash = bcrypt.hashSync(req.body.pword, 14);
  req.body.pword = hash;
  let user = new user_model({
    fname: req.body.fname,
    lname: req.body.lname,
    uname: req.body.uname,
    email: req.body.email,
    pword: req.body.pword,
  });
  user
    .save()

    .then((hpage_redirect) => {
      req.session.userId = user._id;
      if (!(req.session && req.session.userId)) {
        return res.render('index');
      } else {
        res.render('home');
      }
    })

    .catch((err) => {
      user_model
        .findOne({ uname: req.body.uname })
        .exec(function (err, user_list) {
          if (user_list == null) {
            res.status(400).send('User Failed to Register');
          } else {
            return res
              .status(400)
              .send('Username or Email Match an Already Existing Account');
          }
        });
    });
};

exports.render_garage = function (req, res, next) {
  if (!(req.session && req.session.userId)) {
    console.log('boop');
    return res.render('index');
  }
  carmodel.find({ userId: req.session.userId }).exec(function (err, list_cars) {
    if (err) {
      return next(err);
    }
    let result;

    result = list_cars.map(
      (obj) => `${obj.make + ' ' + obj.model + ' ' + obj.year + '\n'}`
    );

    //Successful, so render
    res.render('garage', { title: 'Car List', list_o_cars: result });
  });
};
//use find one to fix login bug thingy
exports.dashboard = function (req, res, next) {
  user_model.findOne({ uname: req.body.uname }).exec(function (err, user_list) {
    req.session.userId = user_list._id;
    if (user_list == null) {
      res.send('Username or Password is Incorrect');
    } else {
      if (bcrypt.compareSync(req.body.pword, user_list.pword)) {
        carmodel
          .find({ userId: req.session.userId })
          .exec(function (err, list_cars) {
            res.render('home', { user_cars: list_cars });
          });
      }
    }
  });
};
exports.register = function (req, res, next) {
  return res.render('register');
};

exports.login = function (req, res, next) {
  res.render('index');
};

// exports.delete = function (req, res, next) {
//   carmodel.find({userId: req.session.userId}).exec(function (err, car_list) {

//   })
// }

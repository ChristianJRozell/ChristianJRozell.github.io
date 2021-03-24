let carmodel = require("../models/car_model");
const { model, Mongoose } = require("mongoose");
const user_model = require("../models/user_model");
const bcrypt = require("bcryptjs");

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
            (obj) => `${obj.year + "  " + obj.make + "  " + obj.model}`
          );

          res.redirect("http://localhost:3000/car_module/garage/");
        });
    })
    .catch((err) => {
      res.status(400).send("Car Failed to Save");
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
        return res.render("index");
      } else {
        res.render("home");
      }
    })

    .catch((err) => {
      user_model
        .findOne({ uname: req.body.uname })
        .exec(function (err, user_list) {
          if (user_list == null) {
            res.status(400).send("User Failed to Register");
          } else {
            return res
              .status(400)
              .send("Username or Email Match an Already Existing Account");
          }
        });
    });
};

exports.render_garage = function (req, res, next) {
  if (!(req.session && req.session.userId)) {
    console.log("boop");
    return res.render("index");
  }
  carmodel.find({ userId: req.session.userId }).exec(function (err, list_cars) {
    if (err) {
      return next(err);
    }
    let result;

    result = list_cars.map(
      (obj) => `${obj.year + "\t" + obj.make + "\t" + obj.model}`
    );

    //Successful, so render
    res.render("garage", {
      title: "Car List",
      list_o_cars: result,
      user_cars: list_cars,
    });
  });
};
//move the usercarlist data to the garage page
exports.dashboard = function (req, res, next) {
  user_model.findOne({ uname: req.body.uname }).exec(function (err, user_list) {
    console.log(user_list);
    req.session.userId = user_list._id;
    if (user_list == null) {
      res.render("index");
    } else {
      if (bcrypt.compareSync(req.body.pword, user_list.pword)) {
        res.render("home");
      }
    }
  });
};
exports.register = function (req, res, next) {
  return res.render("register");
};

exports.login = function (req, res, next) {
  res.render("index");
};

exports.delete = function (req, res, next) {
  let split = req.body.car.split("\t");
  let year = split[0];
  let make = split[1];
  let car_model = split[2];
  carmodel.deleteOne(
    {
      userId: req.session.userId,
      make: make,
      model: car_model,
      year: year,
    },
    function (err) {
      if (err) return handleError(err);
      // delete car
    }
  );
  carmodel.find({ userId: req.session.userId }).exec(function (err, list_cars) {
    if (err) {
      return next(err);
    }
    let result;

    result = list_cars.map(
      (obj) => `${obj.year + "\t" + obj.make + "\t" + obj.model}`
    );

    //Successful, so render
    res.render("garage", {
      title: "Car List",
      list_o_cars: result,
      user_cars: list_cars,
    });
    // res.send("hi");
  });
};

exports.logout = function (req, res, next) {
  console.log("req.session");
  res.redirect("http://localhost:3000/users/");
};

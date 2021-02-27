var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sessions = require('client-sessions');

// const connection_string = require('./secrets/not_my_connection_string.txt');
const mongoose = require('mongoose');
const mongoDB = process.env.connection_string;
console.log(process.env.connection_string);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const garageRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const CarRouter = require('./routes/car_module');

var app = express();

app.get('/', (req, res) => res.render('index'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  sessions({
    cookieName: 'session',
    secret: 'a3hy7dyf3hisd6w36usd',
    duration: 30 * 60 * 1000,
  })
);

app.use('/garage', garageRouter);
app.use('/users', usersRouter);
app.use('/car_module', CarRouter);

// catch 404 and forward to error handlers
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

console.log('Ya Yeet');

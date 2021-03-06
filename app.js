var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var weiboRouter = require('./routes/weiboRouter')

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Connection URL
const url = 'mongodb://localhost:27017/sina'
const connect = mongoose.connect(url);
// const weibo = require('./models/weibo');
connect.then((db) => {
  console.log('Connected correctly to server.');
  // weibo.findOne({})
  //   .then((result) => {
  //     console.log(result);

  //   })
}, (err) => {
  console.log(err);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('Hello-World'));

function auth(req, res, next) {
  console.log(req.headers);
  var authHeader = req.headers.authorization;
  if (!!authHeader) {
    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var passwd = auth[1];
    if (user === 'admin' && passwd === 'password') {
      next()
    }
    else {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
  }
  else {
    var err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    next(err);
  }
}

// app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/weibos', weiboRouter);

// catch 404 and forward to error handler
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

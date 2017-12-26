const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression')
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

var validator = require('express-validator');
var session = require('express-session');
const config = require('./config');
const db = require('./database');

const index = require('./routes/index');
const query = require('./routes/query');

const app = express();
const dbUrl = config.db.uri;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(session({ secret: 'max', saveUninitialized: false, resave: false }));
// app.use(expressSession({ secret: 'max', saveUninitialized: false, resave: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

console.log('Connecting to:', dbUrl)
db.connect(dbUrl)
  .then(() => {
    console.log('Connected to Mongo DB!')
    console.log('Server up at port %d', config.port)
  })
  .catch(err => {
    console.error('Could not connect to Mongo database', err)
    process.exit(0)
  });


app.use('/query', query);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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

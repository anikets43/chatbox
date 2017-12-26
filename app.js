const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const compression = require('compression')
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

var validator = require('express-validator');
var session = require('express-session');
const config = require('./config');
const db = require('./database');

var logger = require("./utils/logger");

const index = require('./routes/index');
const query = require('./routes/query');

const app = express();
logger.debug("Enabling GZip compression.");

app.use(compression({
  threshold: 512
}));

const dbUrl = config.db.uri;

logger.debug("Setting 'Jade' as view engine");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

logger.debug("Overriding 'Express' logger");
app.use(require('morgan')({ "stream": logger.stream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(session({ secret: 'max', saveUninitialized: false, resave: false }));
// app.use(expressSession({ secret: 'max', saveUninitialized: false, resave: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

logger.debug("Configuring MongoDB");
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
  logger.error(err.message);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

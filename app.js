const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const bodyParser = require('body-parser');
//const alertMiddleware = require('./middlewares/alert.middleware')


/**
 * Handlebars and Mongoose config
 */
require('./config/hbs.config');
require('./config/db.config');
// require('./config/mailer.config');
// const passportConfig = require('./config/passport.config')
// const session = require('./config/session.config');

/**
 * Configure express
 */
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session);
// app.use(passportConfig);

// app.use((req, res, next) => {
//   res.locals.currentUser = req.session.user
//   req.currentUser = req.session.user
//   next()
// })

//app.use(alertMiddleware)

/**
 * View engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
const dateHelper = require('./helpers/date');
hbs.registerHelper('date', dateHelper);
const typeIndexHelper = require('./helpers/typeIndex');
hbs.registerHelper('typeIndex', typeIndexHelper);

/**
 * Configure routes
 */
const router = require('./config/routes.js');
app.use('/', router);

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

/** 
 * Listen on provided port
 */
const port = normalizePort(process.env.PORT || '3000');
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
      // named pipe
      return val;
  }
  if (port >= 0) {
      // port number
      return port;
  }
  return false;
}
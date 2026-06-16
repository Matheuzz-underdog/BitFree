var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var encuestaRouter = require('./routes/encuesta.route');
var viewsRouter = require('./routes/views.routes');

var app = express();

if (process.argv[2] === "dev") {
  process.env.NODE_ENV = "development";
  const pjson = require("./package.json");
  console.log(`> DEV | ${pjson.name} v${pjson.version}`);
} else {
  process.env.NODE_ENV = "production";
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewsRouter);
app.use('/api/encuesta', encuestaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

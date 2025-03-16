var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan'); //ter informação na consola dos pedidos que vêem

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//pipeline vertical de processsamento, cada pedido atravessa esta pipeline
app.use(logger('dev')); //modo dev, com mais informação
app.use(express.json()); //retira informação em json do pedido
app.use(express.urlencoded({ extended: false })); //extraí informação dos pedidos
app.use(express.static(path.join(__dirname, 'public'))); //verifica se o pedido que chegou é um estático

//routers
app.use('/', indexRouter);

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

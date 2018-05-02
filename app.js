require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${process.env.DBURL}`));
mongoose.connection.on('disconnected', () => console.log("Mongoose disconnected."));
mongoose.connect(process.env.DBURL);


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const passport = require('./passport');
app.use(passport.initialize());
app.use('/api/', passport.authenticate('jwt', {
  session: false,
  failWithError: true
}));


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
  
  async function shutdown(callback) {
    await mongoose.disconnect();
    if (callback) callback();
    else
      process.exit(0);
  }
  
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  process.once('SIGUSR2', () => {
    shutdown(() => process.kill(process.pid, 'SIGUSR2'));
  });

app.listen(3000, () => console.log('Listening on port 3000'));


module.exports = app;

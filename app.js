require('dotenv').config()

const mongoose = require('mongoose');
// mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${process.env.DBURL}`));
// mongoose.connection.on('disconnected', () => console.log("Mongoose disconnected."));
// mongoose.connect(process.env.DBURL);
var passport	= require('passport');
var config      = require('./config/database'); // get db config file
var User        = require('./models/user'); // get the mongoose model
var port        = process.env.PORT || 3000;
var jwt         = require('jwt-simple');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var userRouter = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(passport.initialize());
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(config.database);

require('./config/passport')(passport);

// app.listen(3000, () => console.log('Listening on port 3000'));



app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
  });
  
  var host = 'http://localhost:3000';
  console.log('Server Started:' + host);
  module.exports = app;
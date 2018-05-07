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
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', passport.authenticate('jwt', { session: false }), usersRouter);

// Handle error statuses
app.use((err, req, res, next) => {
    if (err && err.status && err.message) {
        res.status(err.status).json({
            status: err.status,
            message: err.message
        });
    }
});

module.exports = app;

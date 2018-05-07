require('dotenv').config()
 
const mongoose = require('mongoose');
mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${process.env.DBURL}`));
mongoose.connection.on('disconnected', () => console.log("Mongoose disconnected."));
mongoose.connect(process.env.DBURL);
 
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const authentication = require('./authentication/authentication');
authentication.config(passport);
 
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
 
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
 
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', authentication.authenticateToken(passport), usersRouter);
 
module.exports = app;
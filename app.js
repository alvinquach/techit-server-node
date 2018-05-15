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
const unitsRouter = require('./routes/units');
const ticketsRouter = require('./routes/tickets');
 
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

const apiPath = '/api';
app.use('/', indexRouter);
app.use(`${apiPath}/login`, loginRouter);
app.use(`${apiPath}/users`, authentication.authenticateToken(passport), usersRouter);
app.use(`${apiPath}/units`, authentication.authenticateToken(passport), unitsRouter);
app.use(`${apiPath}/tickets`, authentication.authenticateToken(passport), ticketsRouter);
 
module.exports = app;
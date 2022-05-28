"use strict";

var cors = require('cors');

var morgan = require('morgan');

var helmet = require('helmet');

var app = require('express')();

var bodyParser = require('body-parser');

var xss = require('xss-clean');

var hpp = require('hpp');

var mongoSanitize = require('express-mongo-sanitize');

var version1 = require('./src/versions/version1');

var App = require('./src/controllers/App/appController');

var errHandler = require('./src/controllers/err/Global Error/Global_error_handler'); // SECURITY MIDDLEWARE


app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(morgan('combined'));
app.use(bodyParser.json({
  limit: '10kb'
}));
app.use(hpp()); //HANDLING HOME ROUTE

app.get('/', App.HttpHomeController); //HANDLING VERSIONS

app.use(version1); // UNHANDLED ROUTES

app.use('*', App.HttpHandleUndefinedRoutes); //GLOBAL ERROR HANDLER

app.use(errHandler);
module.exports = app;
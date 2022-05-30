"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('../Mongoose Error/mongooseError');

var JWT = require('../connections Errors/connectionError'); //handles errors in production


function handleProdErr(err, res) {
  if (err.isOperational) return res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message
  });
  return res.status(500).json({
    status: 'error',
    message: 'something went very wrong, check you internet connection and try again!!!'
  });
} //handles error in development


function handleDevErr(err, res) {
  return res.status(err.statusCode || 500).json({
    status: 'error',
    err: err,
    message: err.message,
    name: err.name
  });
} // global error handling middleware


function errHandler(err, req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    var error = _objectSpread({}, err);

    if (error.code === 11000) return mongoose.DuplicateError(error, res);
    if (err.name === 'CastError') return mongoose.CastError(error, res);
    if (err.name === 'ValidationError') return mongoose.ValidationError(error, res);
    if (err.name === 'JsonWebTokenError') return JWT.JwtError(error, res);
    return handleProdErr(err, res);
  }

  handleDevErr(err, res);
}

module.exports = errHandler;
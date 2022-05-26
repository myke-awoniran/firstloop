"use strict";

require('dotenv').config();

var http = require('http');

var Mongoose = require('mongoose');

var Exception = require('./src/controllers/err/Rejection&Exceptions/unhandledRejection');

Exception.unCaughtException();

var app = require('./App');

var HttpServer = http.createServer(app);

var config = require('./config/secret');

var SocketServer = require('./src/sockets/sockets');

var connectDB = require('./src/database/connections/connections');

var DB = config.database_connection_string.replace('<PASSWORD>', config.database_password);

function startServer(server) {
  var expressServer;
  return regeneratorRuntime.async(function startServer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          connectDB(Mongoose, DB);
          expressServer = server.listen(config.port, function () {
            console.log("first loop listening on port ".concat(config.port));
          });
          Exception.unhandledRejection(expressServer);
          SocketServer(expressServer);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

startServer(HttpServer);
require('dotenv').config();
const http = require('http');
const Mongoose = require('mongoose');
const Exception = require('./src/controllers/err/Rejection&Exceptions/unhandledRejection');

Exception.unCaughtException();
const app = require('./App');

const HttpServer = http.createServer(app);
const config = require('./config/secret');
const SocketServer = require('./src/sockets/sockets');
const connectDB = require('./src/database/connections/connections');

const DB = config.database_connection_string.replace(
   '<PASSWORD>',
   config.database_password
);

async function startServer(server) {
   connectDB(Mongoose, DB);
   const expressServer = server.listen(config.port, () => {
      console.log(`first loop listening on port ${config.port}`);
   });
   Exception.unhandledRejection(expressServer);
   SocketServer(expressServer);
}
startServer(HttpServer);

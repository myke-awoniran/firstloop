require('dotenv').config();
const http = require('http');
const app = require('./App');

const config = require('./config/secret');

const HttpServer = http.createServer(app);
const connectDB = require('./src/database/connections/connections');
const SocketServer = require('./src/sockets/sockets');

const DB = config.database_connection_string.replace(
   '<PASSWORD>',
   config.database_password
);

async function Server(server) {
   await connectDB(DB);
   const expressServer = server.listen(config.port, () => {
      console.log(`first loop listening on port ${config.port}`);
   });
   SocketServer(expressServer);
}

Server(HttpServer);

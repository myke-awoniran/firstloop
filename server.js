dotenv = require('dotenv').config();
const http = require('http');
const app = require('./App');
const server = http.createServer(app);
// const io = require('socket.io')(server);
const config = require('./config/secret');
const connectDB = require('./src/database/connections/connections');

const DB = config.database_connection_string.replace(
   '<PASSWORD>',
   config.database_password
);
async function startServer(server) {
   await connectDB(DB);
   server.listen(config.port, () => {
      console.log(`first loop listening on port ${config.port}`);
   });
}

startServer(server);

// console.log(port)

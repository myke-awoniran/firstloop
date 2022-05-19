dotenv = require('dotenv').config();
const Socket = require('socket.io');
const app = require('./App');
const config = require('./config/secret');
const connectDB = require('./src/database/connections/connections');
// const Socket = require('./src/sockets/sockets');

const DB = config.database_connection_string.replace(
   '<PASSWORD>',
   config.database_password
);

async function Server(server) {
   await connectDB(DB);
   const expressServer = server.listen(config.port, () => {
      console.log(`first loop listening on port ${config.port}`);
   });
   // const io = new Socket(Socket, expressServer).socket();
}

Server(app);

// console.log(port)

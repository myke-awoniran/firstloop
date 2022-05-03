const http = require('http');
const app = require('./App');
const server = http.createServer(app);
// const io = require('socket.io')(server);
const { port } = require('./config/secret');
const connectDB = require('./src/database/connections/connections');
const {
   database_connection_string,
   database_password,
} = require('./config/secret');

const DB = database_connection_string.replace('<PASSWORD>', database_password);
async function startServer(server) {
   await connectDB(DB);
   server.listen(port, () => {
      console.log(`first loop listening on port ${port}`);
   });
}

startServer(server);

// console.log(port)

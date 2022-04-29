const http = require('http');
const app = require('./App');
const socket = require('socket.io');
const server = http.createServer(app);
const { port: port } = require('./config/secret');

async function startServer(server) {
   server.listen(port, () => {
      console.log(`chat app running on port ${port}`);
   });
}
startServer(server);
// console.log(port)

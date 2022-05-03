const http = require('http');
const app = require('./App');
const server = http.createServer(app);
const io = require('socket.io')(server);
const { port } = require('./config/secret');

async function startServer(server) {
   server.listen(port, () => {
      console.log(`first loop listening on port ${port}`);
   });
}

startServer(server);

// console.log(port)

const http = require('http');
const app = require('./App');
const server = http.createServer(app);
const io = require('socket.io')(server);
const { port } = require('./config/secret');
const { Socket } = require('engine.io');

io.on('connection', (Socket) => {
   //    console.log('a user just connected');
   //    Socket.on('welcome to first-loop');
});

async function startServer(server) {
   server.listen(port, () => {
      console.log(`chat app running on port ${port}`);
   });
}
startServer(server);

// console.log(port)

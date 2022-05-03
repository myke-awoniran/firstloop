const http = require('http');
const app = require('./App');
const server = http.createServer(app);
const io = require('socket.io')(server);
const { port } = require('./config/secret');
const { Socket } = require('engine.io');

io.on('connection', (Socket) => {
   Socket.emit('welcome to first-loop', (message) => {
      //    console.log('a user just connected');
   });
});

async function startServer(server) {
   server.listen(port, () => {
      console.log(`chat app running on port ${port}`);
   });
}
startServer(server);

// console.log(port)

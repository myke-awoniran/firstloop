const Socket = require('socket.io');

async function SocketServer(server) {
   const io = Socket(server);
   io.on('connection', (socket) => {
      // console.log(' I am connected');
      socket.emit('messageFrom', {
         data: 'this is my server message ' + socket.id,
      });

      socket.on('messageFromClient', (data) => {
         console.log(data);
      });
   });
   // io.on('disconnect');
}

module.exports = SocketServer;

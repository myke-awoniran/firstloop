"use strict";

var Socket = require('socket.io');

function SocketServer(server) {
  var io;
  return regeneratorRuntime.async(function SocketServer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          io = Socket(server);
          io.on('connection', function (socket) {
            // console.log(' I am connected');
            socket.emit('messageFrom', {
              data: 'this is my server message ' + socket.id
            });
            socket.on('messageFromClient', function (data) {
              console.log(data);
            });
          });
          io.on('disconnect', function (socket) {
            console.log('user just disconnected');
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = SocketServer;
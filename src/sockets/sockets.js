class Socket {
   constructor(socketio, expressApp) {
      this.socketio = socketio;
      this.expressApp = expressApp;
   }

   socket() {
      return this.socketio(this.expressApp);
   }
   connection() {}
}

module.exports = Socket;

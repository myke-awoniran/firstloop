/**These are functions to handle
 * error out of the scope of express js */

function unhandledRejection(server) {
   return process.on('unhandledRejection', (err) => {
      console.log(err.name, err.message);
      console.log(
         'unhandled Promise Rejection !! @myke_Awoniran.... First-Loop shutting down gracefully'
      );
      server.close(() => process.exit(1));
   });
}

function unCaughtException() {
   return process.on('uncaughtException', (err) => {
      console.log(err.name, err.message);
      console.log(
         'uncaught Exception!!! @myke_Awoniran .... First-Loop shutting down gracefully'
      );
      process.exit(1);
   });
}

module.exports = {
   unCaughtException,
   unhandledRejection,
};

const config = require('./config');
const server = require('./server');

// start application.
server.createServer();

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception was found.');
  process.exit(1);
});
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection was found.');
  process.exit(1);
});

const express = require('express');
const http = require('http');
const bunyan = require('bunyan');
const bunyanMiddleware = require('bunyan-middleware');

const config = require('../config');
const { version } = require('../package.json');
const routes = require('./routes/employees/v1');

function createServer(port) {
  const app = express();

  app.server = http.createServer(app);
  app.disable('x-powered-by');
  console.log('Starting up...');
  console.log(`Using ${config.configName} config`);

  // middleware.
  const logger = bunyan.createLogger({ name: 'Node Interview Exercise' });
  app.use(bunyanMiddleware({ logger }));
  // app.use(cors());
  // app.use(bodyParser.json());

  // routes.
  app.get('/', (req, res) => res.json({ version }));
  app.use('/store/employees/v1', routes());

  app.server.listen(port || process.env.PORT || config.port, () => {
    console.log(`Server started on port ${app.server.address().port}`);
  });

  return app;
}

module.exports = { createServer };

/*
 * Export options based on environment variable
 */

const nconf = require('nconf');
const path = require('path');

const conf = nconf.argv().env();

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

switch (process.env.NODE_ENV.toLowerCase()) {
  case 'test':
    nconf.file('test', path.resolve(__dirname, './test.json'));
    break;
  case 'production':
    nconf.file('prod', path.resolve(__dirname, './prod.json'));
    break;
  case 'local-prod':
    nconf.file('local-prod', path.resolve(__dirname, './local-prod.json'));
    nconf.file('prod', path.resolve(__dirname, './prod.json'));
    break;
  default:
    nconf.file('dev', path.resolve(__dirname, './dev.json'));
}

conf.file('defaults', path.resolve(__dirname, './defaults.json'));

module.exports = conf.get();

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;

const server = require('.');

describe('Server', () => {
  let app;

  before(() => {
    app = server.createServer();
  });

  it('Should start', () => {
    expect(app).to.not.be.false;
  });

  after(() => {
    app.server.close();
  });
});

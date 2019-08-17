/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */


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

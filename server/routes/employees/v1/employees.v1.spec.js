/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const request = require('supertest');

const server = require('../../..');
const config = require('../../../../config');

describe('Employees V1 Routes', () => {
  let app;

  before(() => {
    app = server.createServer();
  });

  // COLLECTION
  describe('GET:/store/employees/v1', () => {
    it('200', (done) => {
      request(app)
        .get('/store/employees/v1')
        .expect(200, done);
    });

    it('should be filterable by store=0', (done) => {
      request(app)
        .get('/store/employees/v1?store=0')
        .expect(200, [
          {
            id: 4,
            firstName: 'Sarah',
            lastName: 'Hills',
            store: 0
          }
        ], done);
    });
  });

  // describe('POST:/store/employees/v1', () => {
  //   it('200', (done) => {
  //     request(app)
  //       .post('/store/employees/v1')
  //       .expect(200, done);
  //   });
  // });

  // SINGLETON
  describe('GET:/store/employees/v1/:id', () => {
    it('200', (done) => {
      request(app)
        .get('/store/employees/v1/0')
        .expect(200, done);
    });
  });

  // describe('PUT:/store/employees/v1/:id', () => {
  //   it('200', (done) => {
  //     request(app)
  //       .put('/store/employees/v1/key')
  //       .expect(200, done);
  //   });
  // });

  // describe('PATCH:/store/employees/v1/:id', () => {
  //   it('200', (done) => {
  //     request(app)
  //       .patch('/store/employees/v1/key')
  //       .expect(200, done);
  //   });
  // });

  // describe('DELETE:/store/employees/v1/:id', () => {
  //   it('200', (done) => {
  //     request(app)
  //       .delete('/store/employees/v1/key')
  //       .expect(200, done);
  //   });
  // });

  after(() => {
    app.server.close();
  });
});

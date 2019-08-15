/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */


const expect = require('chai').expect;
const request = require('supertest');

const server = require('../../..');
const config = require('../../../../config');
const data = require('./data.json');

describe('Employees V1 Routes', () => {
  let app;

  before(() => {
    app = server.createServer();
  });


  // SINGLETON
  describe('GET:/store/employees/v1/:id', () => {
    
    it('gets employee for id 3', (done) => {
      request(app)
        .get('/store/employees/v1/3')
        .expect(200, 
        {
          "id": 3,
          "firstName": "Andrew",
          "lastName": "Smith",
          "store": 123
        }, 
        done);
    });

    it('gets employee for id 0', (done) => {
      request(app)
        .get('/store/employees/v1/0')
        .expect(200, 
          {
          "id": 0,
          "firstName": "Alex",
          "lastName": "Jones",
          "store": 111
        },
         done);
    });

    it('gets no employee for id 99999', (done) => {
      request(app)
        .get('/store/employees/v1/99999')
        .expect(404, 'Employee not found', done) ;
    });
    // No test for 'it requires employee id' since / is a get all route
  });

  // COLLECTION
  describe('GET:/store/employees/v1/', () => {
    it('gets all employees', (done) => {
      request(app)
        .get('/store/employees/v1')
        .expect(200, data.employees, done);
    });
  });

  describe('GET:/store/employees/v1/by-store-id/', () => {
    it('gets multiple employees', (done) => {
      request(app)
        .get('/store/employees/v1/by-store-id/123')
        .expect(200, [
            {
              "id": 1,
              "firstName": "Chris",
              "lastName": "Jacobs",
              "store": 123
            },
            {
              "id": 3,
              "firstName": "Andrew",
              "lastName": "Smith",
              "store": 123
            },
        ],
        done
        );
    });
    it('gets no employees', done => {
      request(app)
        .get('/store/employees/v1/by-store-id/99999')
        .expect(404, 'No employees found for store id: 99999.', done) 
    });

    it('gets employees for store 0', (done) => {
      request(app)
        .get('/store/employees/v1/by-store-id/0')
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

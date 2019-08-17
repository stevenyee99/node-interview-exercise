/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */


const expect = require('chai').expect;
const request = require('supertest');

const server = require('../../..');
const config = require('../../../../config');
const data = require('./data.json');

const FIXTURES = {
  newEmployee: {
    firstName: 'Steven',
    lastName: 'Yee',
    store: 100
  },
  noName: {
    firstName: '',
    lastName: '',
    store: 100
  },
  badStore: {
    firstName: 'Steven',
    lastName: 'Yee',
    store: 99999
  },
};

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
    // No test for 'it requires employee id' since / is a get all route -- SY 2019
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

  describe('POST:/store/employees/v1', () => {
    // Create new employee then check length via new get request;
    it('creates a new employee', (done) => {
      request(app)
        .post('/store/employees/v1')
        .send(FIXTURES.newEmployee)
        .expect(res => {
          expect(res.body.lastName).to.equal(FIXTURES.newEmployee.lastName);
          expect(res.body.firstName).to.equal(FIXTURES.newEmployee.firstName);
          expect(res.body.store).to.equal(FIXTURES.newEmployee.store);
        })
        .end(() => {
          request(app)
            .get('/store/employees/v1')
            .expect(res => {
              // This is hardcoded at 6.  I could get the length after I create server and see if its that +1.
              expect(res.body).to.have.length(6);
            })
            .end(done)
        });
    });
    it('requires more info', (done) => {
      request(app)
        .post('/store/employees/v1')
        .send(FIXTURES.noName)
        .expect(400, 'firstName, lastName, and store required', done);
    });
    it('requires a valid store', (done) => {
      request(app)
        .post('/store/employees/v1')
        .send(FIXTURES.badStore)
        .expect(400, `Store ${FIXTURES.badStore.store} does not exist.`, done);
    });

    // Create the same employee twice.  Expect an error
    it.only('does not allow for duplicate employees to be created', (done) => {
      let newEmployeeId;
      request(app)
      .post('/store/employees/v1')
      .send(FIXTURES.newEmployee)
      .expect(res => {
        newEmployeeId = res.body.id;
        expect(res.body.lastName).to.equal(FIXTURES.newEmployee.lastName);
        expect(res.body.firstName).to.equal(FIXTURES.newEmployee.firstName);
        expect(res.body.store).to.equal(FIXTURES.newEmployee.store);
      })
      .end(() => {
        // Order matters here since Im strignifying the JSON.
        const expectedEmployee = [{
          id: newEmployeeId,
          firstName: FIXTURES.newEmployee.firstName,
          lastName: FIXTURES.newEmployee.lastName,
          store: FIXTURES.newEmployee.store,
        }];
        request(app)
          .post('/store/employees/v1')
          .send(FIXTURES.newEmployee)
          .expect(400, `Employee already exists.  Please check that the information is current and use an update if its not. ${JSON.stringify(expectedEmployee, null, 2)}.`)
          .end(done)
      });
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

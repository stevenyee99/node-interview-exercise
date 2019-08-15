/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const router = require('express').Router();
const _ = require('lodash');

const data = require('./data');

function employeesRoutes() {
  // COLLECTION
  router.get('/', (req, res) => {
    return res.status(200).send(data.employees);
  });

  // Approach
  // Check for required fields.  Send error message if not there
  // Check if store is correct
  // Check if employee already exists
  // router.post('/', (req, res) => {
  //   res.json({ ok: true });
  // });

  // SINGLETON
  router.get('/:id', (req, res) => {
    const employeeId = req.params.id;
    if(!employeeId) {
      return res.status(400).send('Employee ID required');
    }

    // I think this line is simpler than adding _ personally.  I'm generally not a fan of using functions as arguments since they make it harder to read.
    // I use == vs === here since the request comes in as a string and the data is a number.
    // I could also turn the storeId into an Int.  This seems simpler to me from a coding perspective.
    const employee = data.employees.filter(e => e.id == employeeId);
    // Old style.  Would remove in an MR.  Left in for a discussion point.
      // const employee = _.find(data.employees, ['id', parseInt(employeeId, 10)]);

    if(employee[0]) {
      // Given how loose our DB is, there should be a (cronjob?) check to make sure we dont have collisions with keys.
      return res.json(employee[0]);
    }
    return res.status(404).send('Employee not found');
  });

  // COLLECTION
  router.get('/by-store-id/:storeId', (req, res) => {
    const storeId = req.params.storeId;
    // Dev note:  Store '0' works here because its a string not int.  --S.Y. 2019
    if(!storeId) {
      return res.status(400).send('Store ID required');
    }
    
    const employees = data.employees.filter(employee => employee.store == storeId)

    if(employees.length > 0) {
      return res.status(200).send(employees);
    }
    return res.status(404).send(`No employees found for store id: ${storeId}.`);
  });

  // router.put('/:id', (req, res) => {
  //   res.json({ ok: true });
  // });

  // router.patch('/:id', (req, res) => {
  //   res.json({ ok: true });
  // });

  // router.delete('/:id', (req, res) => {
  //   res.json({ ok: true });
  // });

  return router;
}

module.exports = employeesRoutes;

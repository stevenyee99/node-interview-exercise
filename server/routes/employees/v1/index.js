/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const router = require('express').Router();

const data = require('./data');
const uuidv4 = require('uuid/v4');

function employeesRoutes() {
  // COLLECTION
  router.get('/', (req, res) => {
    return res.status(200).send(data.employees);
  });

  router.post('/', (req, res) => {
    const { firstName, lastName, store } = req.body;
    if(!firstName || !lastName || !store) {
      return res.status(400).send('firstName, lastName, and store required');
    }

    // Validate
    const isValidStore = !!data.stores[store]; // Felt the variable name added some self-documentation.  Line could easily be removed and put in the if statement
    if(!isValidStore) {
      return res.status(400).send(`Store ${store} does not exist.`);
    }
    const duplicateEmployees = data.employees.filter(e => e.firstName === firstName && e.lastName === lastName);
    const isDuplicateEmployee = duplicateEmployees.length > 0;
    if(isDuplicateEmployee) {
      return res.status(400).send(`Employee already exists.  Please check that the information is current and use an update if its not. ${JSON.stringify(duplicateEmployees, null, 2)}.`);
    }

    // Add to "DB"
    const newEmployee = {
      id: uuidv4(),
      firstName,
      lastName,
      store
    }

    // 2 options here, one simply append the data and have it vanish when server restarts
    // Other is to actually append to the file.  I felt the former is simpler and more inline with what you're trying to test.
    data.employees.push(newEmployee);

    return res.status(200).send(newEmployee);
  });

  // SINGLETON
  router.get('/:id', (req, res) => {
    const employeeId = req.params.id;
    if(!employeeId) { // Condition currently unreachable due to  get "/" route
      return res.status(400).send('Employee ID required');
    }

    // I think this line is simpler than adding _ personally.  I'm generally not a fan of using functions as arguments since they make it harder to read.
    // I use == vs === here since the request comes in as a string and the data is a number.
    // I could also turn the storeId into an Int.  This seems simpler to me from a readability perspective.
    const employee = data.employees.filter(e => e.id == employeeId);
    // Old style.    _.find(data.employees, ['id', parseInt(employeeId, 10)]);

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

  // Approach for Patch and put
  // 1.  Take employee Id.  Make sure employee exists
  // 2.  Validate data.  Store must exists.  Must have f/l name
  // 3.  perform update

  // router.put('/:id', (req, res) => {
  //   res.json({ ok: true });
  // });

  // router.patch('/:id', (req, res) => {
  //   res.json({ ok: true });
  // });

  // Approach for Delete
  // 1.  Take employee Id.  Make sure employee exists
  // 2.  Find index of employee.  Splice it out
  // 3.  Give that our DB is kinda loose, I'd probably recursively perform this until I dont find the employeeID
  
  // router.delete('/:id', (req, res) => {
  //   res.json({ ok: true });
  // });

  return router;
}

module.exports = employeesRoutes;

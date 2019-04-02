const router = require('express').Router();
const _ = require('lodash');

const data = require('./data');

function employeesRoutes() {
  // COLLECTION
  router.get('/', (req, res) => {
    console.log(req.query);

    // q - why won't this work for store=0?
    const store = parseInt(req.query.store, 10);
    const employeesByStore = store
      ? _.filter(data.employees, ['store', store])
      : data.employees;

    res.json(employeesByStore);
  });

  // router.post('/', (req, res) => {
  //   res.json({ ok: true });
  // });

  // SINGLETON
  router.get('/:id', (req, res) => {
    const employee = _.find(data.employees, ['id', parseInt(req.params.id, 10)]);

    if (employee) {
      return res.json(employee);
    }
    return res.sendStatus(404);
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

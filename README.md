Nike Interview Exercise
===========
---

## Instructions ##

### Setup Steps ###
1. clone project repo
1. run `yarn install`

### Commands ###
* `start` - run server
* `test` - run unit and static-analysis tests
* `test:watch` - auto-run unit tests on file change

### Exercises ###
1. Fix the route to request a collection of employees filterable by query string. Should be able to filter by `store` or employee `id`.
1. Create a route to add a new employee. Requests without the required fields (`firstName`, `lastName`, `store`) should be rejected with proper error response. Describe how you would implement generation of the employee `id`. Write tests.

### Links ###
* [https://github.com/visionmedia/supertest](https://github.com/visionmedia/supertest)
* [https://lodash.com/docs](https://lodash.com/docs)

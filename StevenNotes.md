# General
Most of my comments in here are for you so we have clear discussion points.  I would not leave most of these in for a real MR.  Only the gotcha's would stay (like the truthy falsey one).

# Patterns
## Routes
I think that the route names started a bit unclear.  I inutit `/` as a get all employees since we're in the context of employees based on the base route (even better than / would be `/get-all-employees`).  If I want to get by id `/:id` makes sense since we are in the context of employees.  If I want to get by store, then it should have a longer route of `/get-by-store/:storeId`.

Someone who sees the request from the FE only has the context of the route name so I generally think that longer and more descriptive names are better.

I'd also ask about get by storeIds or employeeIds.  Something that takes an array of ids and returns an array of employees.  If there's a use case, this would be a good time to build it since I'd have all the context and can share code between them.

## API Responses
If I was supreme overload of Nike, I'd introduce an API Response of the following object.
`{ error: false, data: 'Results here' }`
Pros:  On client side, you dont automatically throw into a catch block if the server 500s.  Its much easier to handle errors when there are multiple server calls.
Cons:  You're giving a 200 even if there is a problem.  Grrrrr


# General
1.  Update to Node 10

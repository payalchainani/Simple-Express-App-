# Pets and Owners

## Intro

[Express.js](http://expressjs.com/) is a web application framework for Node.js. It is designed for building web applications and APIs.

This sprint will help you get used to Express as well as recap over the use of the [file system module](https://nodejs.org/api/fs.html). A common architectural pattern is known as MVC where we split each type of job into three sections:

* *Model*: represents the different data in used by your application and handles the interactions with the database (in this case, we are using files to represent a database).
* *View*: is in charge of what to render/show to the user and using the data it is passed to create everything needed on the screen. For now, we are unconcerned with this.
* *Controller*: is like the manager. The controller function is a function that is designed to handle a specific task. It works with the model to handle any of the necessary changes to the data and will then collect up everything needed and will respond using the relevant view or data.

Here's a nice article to help with your understanding of this pattern:
[MVC Bar analogy](https://medium.freecodecamp.org/model-view-controller-mvc-explained-through-ordering-drinks-at-the-bar-efcba6255053)


### Tools

1. [Postman](https://www.getpostman.com/) to test your requests

### Objectives
1. Learn how to get a simple web server up and running using express.
2. Learn how to handle GET, PUT, POST and DELETE requests.
3. Understand how to use Express Routers
4. Understand how to use parameters and queries
5. Learn about the Models and Controllers of MVC architecture


### Tasks:

For now, do not worry about testing programatically, we will use Postman!

1. Make sure you have a working Express application from the introductory lecture(s).
2. Begin by building from scratch a new Express application with the following routes:

- GET /api/pets (gets all the pets)
- GET /api/pets/:id (gets a pet by ID)
- POST /api/pets
- PUT /api/pets/:id
- DELETE /api/pets/:id

To begin with, just make sure your application responds on these routes with some hardcoded or dummy data, or a simple text response to make sure the routes are working. You will find the controllers already provided in the `controllers` directory.

3. Consider how to interact with the data stored in the `data` directory. You will need to interact with the filesystem to read, update, delete or create new files in our 'database'. You should use Asynchronous Filesystem methods. Modify your pets endpoints to send back the appropriate information on each request, using controllers and models. Remember that when you test your DELETE endpoint you will have to create the file again because it will be deleted!

4. Create the following routes to handle requests relating to the owners resource. You might find a lot of repeated code and logic in your controllers and your models - that's okay for now!

- GET /api/owners
- POST /api/owners
- PUT /api/owners/:id


5. If you are not already using them, use Express Routers to better organise your application logic and forward requests for owners onto an `ownersRouter` and requests for pets onto a `petsRouter`.

6. Think about what happens when a user requests an owner or a pet that doesn't exist. Read about [Error Handling](http://expressjs.com/en/guide/error-handling.html). Send back an appropriate response and make sure your application doesn't crash when this happens!

7. What happens when a user tries to POST a pet that has a non-existant owner? Send back an appropriate response and make sure your application doesn't crash when this happens!

7. Time for some more complex functionality! Allow your user to use a query to ask for pets with a specific owner:

- GET /api/pets?owner=o2

8. The user should also be able to DELETE an owner and this should also delete any pets belonging to this owner.

- DELETE /api/owners/:id

9. It's getting annoying to keep re-creating the pets and owners files when we delete or modify them as we test our API, right? Create a folder called `seed` and create a `seed.js` which deletes the pet and owners data and then re-creates all the pets files and all the owners files from scratch. You can use the synchronous `fs` methods for this one if you want, as the speed of seeding initial data is not usually a high priority in the way that the speed of accessing data on an API request is.

### Extra

10. Read about [Application level middleware](http://expressjs.com/en/guide/using-middleware.html#middleware.application).

11. Create log.txt file in the root directory. We will use this file to keep logs about requests our server receives. Figure out how to create a logger middleware function that writes the following to the bottom of the log file:
    - request method
    - requested url
    - time of the request


# REST api SQL
 
In this project I created a REST API using Express. The API mocks a way to administer a school database containing information about users and courses. Users can interact with the database to create new courses, retrieve information on existing courses, and update or delete existing courses. To make changes to the database, users will be required to log in so the API will also allow user to create a new account or retrieve information on an existing account. 

## Technologies
- Node.js
- Express
- REST APIs
- Sequelize
- Postman

## Usage
Install project dependencies
```
npm install
```

Seed the SQlite database
```
npm  run seed
```

Start the application
`npm start`

*You can use Postman to test the API*

You can test:
- GET
- POST

on `https://localhost:5000/api/users`

&

You can test:
- GET
- POST

on `https://localhost:5000/api/courses`

&

You can test: 
- GET
- PUT
- DELETE

on `https://localhost:5000/api/courses/:id`
## [DMS-papyrus](https://github.com/andela-aalabi/DMS-papyrus)

[![Build Status](https://travis-ci.org/andela-aalabi/DMS-papyrus.svg?branch=feature/146281101/front-end-tasks)](https://travis-ci.org/andela-aalabi/DMS-papyrus)

<img width="1280" alt="screen shot 2017-06-12 at 1 23 29 pm" src="https://user-images.githubusercontent.com/26273354/27033966-85cc09bc-4f73-11e7-9304-e0a22f3817ad.png">

<img width="1272" alt="screen shot 2017-06-12 at 1 23 57 pm" src="https://user-images.githubusercontent.com/26273354/27033979-9002ecfc-4f73-11e7-9c2d-cbaf93d18192.png">

<img width="1275" alt="screen shot 2017-06-12 at 1 23 42 pm" src="https://user-images.githubusercontent.com/26273354/27033981-91773e12-4f73-11e7-97a5-31cd3f7b6241.png">

<img width="1265" alt="screen shot 2017-06-12 at 1 25 48 pm" src="https://user-images.githubusercontent.com/26273354/27033985-9380974e-4f73-11e7-9a5b-57a54a42f11e.png">

>This document management system is a full stack application that manages documents, users and user roles. 

It also provides restful APIs for users to create and manage documents giving different privileges based on user roles and managing authentication of users with JsonWebToken.

## API Documentation
-----
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.
#### API Features

The following features make up the Document Management System API:

###### Authentication

- It uses JSON Web Token (JWT) for authentication.  

- It generates a token on successful login or account creation and returns it to the consumer.  

- It verifies the token to ensures a user is authenticated to access protected endpoints.

###### Users

- It allows users to be created.  

- It allows users to login and obtain a token 

- It allows authenticated users to retrieve and update their information.  

- It allows the admin to manage users.

- It allows for assignment of roles to users  


###### Documents

- It allows new documents to be created by authenticated users.  

- It ensures all documents are accessible based on the permission specified.  

- It allows admin users to be able to delete documents.


- It ensures users can delete, edit and update documents that they own.  

- It allows users to retrieve all documents they own as well as public documents.

###### Search

- It allows users to search public documents for a specified search term.
- It allows admin to retrieve all documents that matches search term.
- It allows admin to search users based on a specified search term


## Hosted App on Heroku
[Papyrus-DMS](https://papyrus-dms.herokuapp.com/)

---


## Below are the API endpoints and their functions
EndPoint                                |   Functionality
----------------------------------------|------------------------
POST /users/login                		    |Logs a user in.
POST /users/logout               		    |Logs a user out.
POST /users                       		|Creates a new user.
GET /users                        		 |Find matching instances of user.
GET /users/profile                      |Gets the logged in user's profile
GET /users?search=:word             		|Search the users base on search query param 
GET /users?limit=:num                 		|Limits the users return, defaults to ten
GET /users?limit=:limit=:num&offset=:num     		|Sets the next users to get 
GET /users/:id                         	|Gets a single user.
PUT /users/:id                         	|Update user.
DELETE /users/:id                      |Delete user.
POST /documents                    	|Creates a new document instance.
GET /documents               			|Find matching instances of document.
GET /documents?search=:word         		|Search the documents base on the query param 
GET /documents?limit=:num                 	|Limits the documents return, defaults to ten
GET /documents?limit=:num&offset=:num     	|Sets the next documents to get 
GET /documents/:id            			|Find document.
PUT /documents/:id            			|Update document attributes.
DELETE /documents/:id        			|Delete document.


The following are some sample requests and responses from the API.

- [Roles](#roles)
  - [Get roles](#get-roles)

- [Users](#users)
  - [Create user](#create-user)
  - [Get user](#get-user)

- [Documents](#documents)
  - [Get All documents](#get-all-documents)
  - [Create document](#create-document)
  - [Get document](#get-document)
  - [Edit document](#edit-document)
  - [Delete document](#delete-document)

- [Search](#search)
  - [Search Documents](#search-documents)
  - [Search Users] (#search-users)


## Users
Endpoint for Users API.

### Create User

#### Request
- Endpoint: POST: `/users`
- Body `(application/json)`
```json
{
  "username": "uniqueuser",
  "firstName": "Unique",
  "lastName": "User",
  "email": "uniqueuser@unique.com",
  "RoleId": 1,
  "password": "password"
}
```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "user": {
    "id": 141,
    "username": "uniqueuser",
    "firstName": "Unique",
    "lastName": "User",
    "email": "uniqueuser@unique.com",
    "RoleId": 1,
    "password": "password",
    "createdAt": "2017-02-19T17:34:19.992Z",
    "updatedAt": "2017-02-19T17:34:19.992Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjE0MSwiUm9sZUlkIjoxLCJpYXQiOjE0ODc1MjU2NjAsImV4cCI6MTQ4NzY5ODQ2MH0.ddCQXZB2_woJ32xZNHqPBhNXfjBRg6T3ZsSmF8GCplA",
  "expiresIn": "2 days"
}
```

### Get Users

#### Request
- Endpoint: GET: `/users`
- Requires: Authentication, Admin Role

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
  "id": 140,
  "username": "nypd",
  "firstName": "sugar",
  "lastName": "ray",
  "email": "sss@nypd.com",
  "RoleId": 1,
  "password": "$2a$08$ErbiyXkXAXsGXLoG2VOIIucUwzaCXGJz.d5YKkL/0SQIM3xhdbib2",
  "createdAt": "2017-02-17T19:41:30.837Z",
  "updatedAt": "2017-02-17T19:41:30.837Z"
},
{
  "id": 141,
  "username": "uniqueuser",
  "firstName": "Unique",
  "lastName": "User",
  "email": "uniqueuser@unique.com",
  "RoleId": 1,
  "password": "$2a$08$eggCuipNKnau7CJcxGVaUeEssqo5OjbQedfV1.gGNT2GNTyloD6MS",
  "createdAt": "2017-02-19T17:34:19.992Z",
  "updatedAt": "2017-02-19T17:34:19.992Z"
}]
```

## Documents
Endpoint for document API.

### Get All Documents

#### Request
- Endpoint: GET: `/documents`
- Requires: Authentication, Admin Role

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
    "id": 10,
    "title": "Another Day",
    "content": "This is the day that the Lord has made",
    "accessId": 1,
    "ownerId": 21,
    "createdAt": "2017-02-17T17:40:45.146Z",
    "updatedAt": "2017-02-17T17:40:45.146Z"
  },
  {
    "id": 11,
    "title": "Private",
    "content": "Never hidden from admin eyes",
    "accessId": 2,
    "ownerId": 1,
    "createdAt": "2017-02-06T22:55:43.747Z",
    "updatedAt": "2017-02-06T22:55:43.747Z"
  }]
```

### Create Document

#### Request
- Endpoint: POST: `/documents`
- Requires: Authentication
- Body `(application/json)`
```json
{
  "title": "Random Title",
  "content": "Just some text here",
  "accessId": 3
}
```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "id": 1,
  "title": "Random Title",
  "content": "Just some text here",
  "ownerId": 1,
  "accessId": 3,
  "createdAt": "2017-02-05T05:51:51.217Z",
  "updatedAt": "2016-02-05T05:51:51.217Z"
}
```


### Get Document

#### Request
- Endpoint: GET: `/documents/:id`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "id": 1,
  "title": "Random Title",
  "content": "Just some text here",
  "ownerId": 1,
  "accessId": 3,
  "createdAt": "2017-02-05T05:51:51.217Z",
  "updatedAt": "2016-02-05T05:51:51.217Z"
}
```

### Edit Document

#### Request
- Endpoint: PUT: `/documents/:id`
- Requires: Authentication
- Body `(application/json)`:
```json
{
  "title": "Updated Title",
}
```

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
  {
    "id": 1,
    "title": "Updated Title",
    "content": "Just some text here",
    "ownerId": 1,
    "accessId": 3,
    "createdAt": "2017-02-05T05:51:51.217Z",
    "updatedAt": "2016-02-05T05:51:51.217Z"
  }
```

### Delete Document

#### Request
- Endpoint: DELETE: `/documents/:id`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "Document successfully deleted"
}
```


### Search
#### Documents

#### Request
- Endpoint: GET: `/search/documents/?search=searchterm`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
    "id": 10,
    "title": "Another Day",
    "content": "This is the day that the Lord has made",
    "accessId": 1,
    "ownerId": 21,
    "createdAt": "2017-02-17T17:40:45.146Z",
    "updatedAt": "2017-02-17T17:40:45.146Z"
  },
  {
    "id": 11,
    "title": "Private",
    "content": "Never hidden from admin eyes",
    "accessId": 2,
    "ownerId": 1,
    "createdAt": "2017-02-06T22:55:43.747Z",
    "updatedAt": "2017-02-06T22:55:43.747Z"
  }]
```

### Users

#### Request
- Endpoint: GET: `/search/users/?search=searchterm`
- Requires: Authentication, Admin Role

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
  "id": 140,
  "username": "nypd",
  "firstName": "sugar",
  "lastName": "ray",
  "email": "sss@nypd.com",
  "RoleId": 1,
  "password": "$2a$08$ErbiyXkXAXsGXLoG2VOIIucUwzaCXGJz.d5YKkL/0SQIM3xhdbib2",
  "createdAt": "2017-02-17T19:41:30.837Z",
  "updatedAt": "2017-02-17T19:41:30.837Z"
},
{
  "id": 141,
  "username": "uniqueuser",
  "firstName": "Unique",
  "lastName": "User",
  "email": "uniqueuser@unique.com",
  "RoleId": 1,
  "password": "$2a$08$eggCuipNKnau7CJcxGVaUeEssqo5OjbQedfV1.gGNT2GNTyloD6MS",
  "createdAt": "2017-02-19T17:34:19.992Z",
  "updatedAt": "2017-02-19T17:34:19.992Z"
}]
```
---
## Technologies Used
- JavaScript (ES6)
- Node.js
- Express
- Postgresql
- Sequelize ORM
- React
- Materialize CSS


## Contribute
### Prerequisites includes
- [Postgresql](https://www.postgresql.org/) and
-  [Node.js](http://nodejs.org/) >= v6.8.0.

### Procedure
1. Clone this repository from a terminal `https://github.com/andela-aalabi/DMS-papyrus.git`.
1. Move into the project directory `cd dms`
1. Install project dependencies `npm install`
1. Create Postgresql database and run migrations `npm undo` and `npm redo`.
1. Start the express server `npm start`.
1. Run test `npm test`.
2. Make changes and commit your changes
4. git push and make a pull request to my repo

### How to Contribute
----------------------
* Fork or clone the repo to your computer.
* Change directory: cd dms
* Run npm install
* Create a feature branch and work on it.
* Push to the remote branch.
* Open a Pull Request to development branch.
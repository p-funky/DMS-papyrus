This Document Management System API contains several end points that allow users to create, retrieve, update and delete documents and users. In addition, users can also have roles assigned to them and documents can also have acess rights.

Development
-----------
The application was developed with [NodeJS](http://nodejs.org) as the server. [Express](http://expressjs.com) was used for routing. The [Postgres](http://postgresql.com) database was used with [Sequelize](http://sequelizejs.com) as the ORM

## API ENDPOINTS
**Users**

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/users](#create-users) | Create a new user
GET | [/users](#get-users) | Get all users
GET | [/users/:id](#get-a-user) | Get details of a specific user
PUT | [/users/:id](#update-user) | Edit user details
DELETE | [/users/:id](#delete-user) | Remove a user from storage
POST | [/users/login](#login) | To log a user in
GET| [/users/:id/documents](#get-usersdoc) | To get document of a specific user
GET | [/search/users?={}](#search-user) | Search for a user


**Documents**

Request type | Endpoint | Action
------------ | -------- | ------
POST | [/documents](#create-document) | Create a new document
GET | [/documents](#get-documents) | Retrieve all documents
GET | [/documents/:id](#get-a-document) | Retrieve a specific document
PUT | [/documents/:id](#update-document) | Update a specific document
DELETE | [/documents/:id](#delete-document) | Delete a specific document
GET | [/documents?offset=0&limit=10](#get-documents) | Pagination for document retrieval
GET | [/search/documents/](#search-document) | Search for documents


Users
-----

## Create Users
To create a new user, make a **POST** request to `/users`
#### Request
```
{
    "firstName": "Naruto",
    "lastName": "Uzumaki"
    "userName": "Hokage"
    "email": "naruto@konoha.com",
    "password":"secret"
}
```

#### Response
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjE1LCJFbWFpbCI6ImFkYUBnbWFpbC5jb20iLCJSb2xlSWQiOjEsImlhdCI6MTQ5MTIyMTk4NiwiZXhwIjoxNDkxMjU3OTg2fQ.MtqGTyA5q7zrs7pgbKwtsVUqiTyWYcH6KINgnQK8KJA",
  "expiresIn": "2days",
  "user": {
    "id": 2,
    "firstName": "Naruto",
    "lastName": "Uzumaki",
    "userName": "Hokage",
    "email": "naruto@konoha.com",
    "roleId": 2,
    "updatedAt": "2017-06-18T12:19:45.740Z",
    "createdAt": "2017-06-17T12:19:45.740Z"
  }
}
```

## Get Users
Fetches all users' details,
#### Request
  - Endpoint: **GET**: `/users`
  - Optional queries **offset** (where to start from) && **limit** (number of users per page)
  - Requires `Authorization` header to be set
#### Response
```
{
"paginationInfo": {
  "totalCount": 24,
  "currentPage": 1,
  "pageCount": 3,
  "pageSize": 8
},
"users": [
  {
    "id": 20,
    "firstName": "Itachi",
    "lastName": "Uchiha",
    "userName": "Amateratsu",
    "email": "itatchi@konoha.com",
    "roleId": 2,
    "createdAt": "2017-05-28T01:23:36.614Z",
    "updatedAt": "2017-05-28T01:23:36.614Z",
  },
  {
    "id": 22,
    "firstName": "Neji",
    "lastName": "Hyuuga",
    "userName": "Hakke",
    "email": "neji@konoha.com",
    "roleId": 2,
    "createdAt": "2017-05-28T01:23:36.614Z",
    "updatedAt": "2017-05-28T01:23:36.614Z",
  },
  {
    "id": 23,
    "firstName": "Shikamaru",
    "lastName": "Nara",
    "userName": "Kagemani",
    "email": "shika@konoha.com",
    "roleId": 2,
    "createdAt": "2017-05-28T01:23:36.614Z",
    "updatedAt": "2017-05-28T01:23:36.614Z",
  },
  {
    "id": 25,
    "firstName": "Choji",
    "lastName": "Akimichi",
    "userName": "Fatso",
    "email": "choji@konoha.com",
    "roleId": 2,
    "createdAt": "2017-05-28T01:23:36.614Z",
    "updatedAt": "2017-05-28T01:23:36.614Z",
  },
  {
    "id": 26,
    "firstName": "Ino",
    "lastName": "Yamanaka",
    "userName": "Mind-control",
    "email": "ino@konoha.com",
    "roleId": 2,
    "createdAt": "2017-05-28T01:23:36.614Z",
    "updatedAt": "2017-05-28T01:23:36.614Z",
  },
  {
    "id": 27,
    "firstName": "Kiba",
    "lastName": "Inuzuka",
    "userName": "Akamaru",
    "email": "kiba@konoha.com",
    "roleId": 2,
    "createdAt": "2017-05-28T01:23:36.614Z",
    "updatedAt": "2017-05-28T01:23:36.614Z",
  },
  {
    "id": 30,
    "firstName": "Kakashi",
    "lastName": "Hatake",
    "userName": "copy-ninja",
    "email": "kakashi@konoha.com",
    "roleId": 1,
    "createdAt": "2017-05-28T01:23:36.614Z",
    "updatedAt": "2017-05-28T01:23:36.614Z"
  },
  {
    "id": 31,
    "firstName": "Gai",
    "lastName": "Maito",
    "userName": "Greenbeast",
    "email": "gai@konoha.com",
    "roleId": 2,
    "createdAt": "2017-05-28T01:23:36.614Z",
    "updatedAt": "2017-05-28T01:23:36.614Z"
  },
]
}
```


## Get A User
#### Request
  - Endpoint: **GET**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response
```
{
  "id": 35,
  "firstName": "Rock",
  "lastName": "Lee",
  "userName": "fuzzybrows",
  "email": "rock@konoha.com",
  "roleId": 2,
  "createdAt": "2017-05-28T01:23:36.614Z",
  "updatedAt": "2017-05-28T01:23:36.614Z"
}
```
## Update user
#### Request
  - Endpoint: **PUT**: `/users/:id`
  - Requires `Authorization` header to be set
```
{
  "roleId": 1
}
```
#### Response
```
{
  "id": 35,
  "firstName": "Rock",
  "lastName": "Lee",
  "userName": "fuzzybrows",
  "email": "rock@konoha.com",
  "roleId": 1,
  "createdAt": "2017-05-28T01:23:36.614Z",
  "updatedAt": "2017-05-28T01:23:36.614Z"
}
```

## Delete user
#### Request
  - Endpoint: **DELETE**: `/users/:id`
  - Requires `Authorization` header to be set
#### Response

```
{
  "message": "User succesfully deleted"
}
```

## User login
### Request
 - Endpoint: **POST**: `/users/login`
```
{
    "username": "ino@konoha.com",
    "password":"secret"
}
```

### Response
```
{
  message: "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjMsIlJvbGVJZCI6MSwiaWF0IjoxNDkyNzczMzc4LCJleHAiOjE0OTI4NTk3Nzh9.6C9u-1ylQOUpTQDVPm0TmIuVmDaP2PMgMxLkP1sjI"
}
```

# Get user's Document
### Request
  - Endpoint: **GET**: `/users/:id/documents`
  - Requires `Authorization` header to be set

### Response
```
{
"documents": [
  {
    "id": 2,
    "title": "Hello World",
    "content": "My first document",
    "accessId": 1,
    "OwnerId": 1
    "createdAt": "2017-05-20T14:36:22.247Z",
    "updatedAt": "2017-05-23T22:47:36.725Z"
  },
  {
    "id": 3,
    "title": "Olobe",
    "content": "The soup recipe",
    "accessId": 1,
    "OwnerId": 1
    "createdAt": "2017-05-20T14:36:22.247Z",
    "updatedAt": "2017-05-23T22:47:36.725Z"
  },
  {
    "id": 6,
    "title": "Ideal World",
    "content": "Where humans have mutual respect",
    "accessId": 2,
    "OwnerId": 1
    "createdAt": "2017-05-20T14:36:22.247Z",
    "updatedAt": "2017-05-23T22:47:36.725Z"
  },
  {
    "id": 28,
    "title": "Count your blessings",
    "content": "Name them one by one",
    "accessId": 3,
    "OwnerId": 1
    "createdAt": "2017-05-20T14:36:22.247Z",
    "updatedAt": "2017-05-23T22:47:36.725Z"
  },
  {
    "id": 55,
    "title": "War in heaven",
    "content": "As if God is not always in control",
    "accessId": 1,
    "OwnerId": 1
    "createdAt": "2017-05-20T14:36:22.247Z",
    "updatedAt": "2017-05-23T22:47:36.725Z"
  }
],
"paginationInfo": {
  "totalCount": 5,
  "currentPage": 1,
  "pageCount": 1,
  "pageSize": 5
}
}
```

DOCUMENTS
---------
## Create Document
#### Request
  - Endpoint **POST** `/documents`
  - Requires `Authorization` header to be set
```
{
  "title": "Alao akala",
  "content": "Abami eda",
  "access": 1
}
```
#### Response
  - Body `(application/json)`
```
{
  "id": 55,
  "title": "Alao akala",
  "content": "Abami eda",
  "accessId": 1,
  "OwnerId": 3
  "createdAt": "2017-05-20T14:36:22.247Z",
  "updatedAt": "2017-05-23T22:47:36.725Z"
}
```
## Get Documents
#### Request
  - Endpoint **GET** `/documents`
  - Optional queries **offset** (where to start from) && **limit** (number of documents per page)
  - Requires `Authorization` header to be set

#### Response
```
[
  {
  "id": 55,
  "title": "Alao akala",
  "content": "Abami eda",
  "accessId": 1,
  "OwnerId": 3
  "createdAt": "2017-05-20T14:36:22.247Z",
  "updatedAt": "2017-05-23T22:47:36.725Z
  },
  {
    "id": 2,
    "title": "Hello World",
    "content": "My first document",
    "accessId": 1,
    "OwnerId": 1
    "createdAt": "2017-05-20T14:36:22.247Z",
    "updatedAt": "2017-05-23T22:47:36.725Z"
  },
  {
    "id": 3,
    "title": "Olobe",
    "content": "The soup recipe",
    "accessId": 1,
    "OwnerId": 1
    "createdAt": "2017-05-20T14:36:22.247Z",
    "updatedAt": "2017-05-23T22:47:36.725Z"
  },
  {
    "id": 20,
    "title": "Chai",
    "content": "There is God o!",
    "accessId": 1,
    "OwnerId": 1
    "createdAt": "2017-05-20T14:36:22.247Z",
    "updatedAt": "2017-05-23T22:47:36.725Z"
  },
  {
    "id": 44,
    "title": "Adventures of Tin Tin",
    "content": "Billions of blue blistering barnacles",
    "access": 2,
    "ownerId": 4,
    "createdAt": "2017-04-21T05:31:16.778Z",
    "updatedAt": "2017-04-21T05:31:16.778Z"
  }
]
```

## Get A Document
#### Request
  - Endpoint **GET** `/documents/:id` where id is the id of the document
  - Requires `Authorization` header to be set

##### Response
```
{
    "id": 3,
    "title": "Olobe",
    "content": "The soup recipe",
    "accessId": 1,
    "OwnerId": 1
    "createdAt": "2017-05-20T14:36:22.247Z",
    "updatedAt": "2017-05-23T22:47:36.725Z"
}
```

## Update Document
#### Request
  - Endpoint **PUT** `/documents/:id` id is the id of the document
  - Requires `Authorization` header to be set
```
{
  "title": "Cook Book",
}
```
##### Response
```
{
  "id": 3,
  "title": "Cook Book",
  "content": "The soup recipe",
  "accessId": 1,
  "OwnerId": 1
  "createdAt": "2017-05-20T14:36:22.247Z",
  "updatedAt": "2017-05-23T22:47:36.725Z"
}
```

## Delete Document
#### Request
  - Endpoint **DELETE** `/documents/:id`id of the document
  - Requires `Authorization` header to be set
#### Response
```
{
  message: 'Document successfully deleted'
}
```

Search
-----

## Search Users
#### Request
  - Endpoint **GET** `/search/users?search=ruto`
  - Requires `Authorization` header to be set
#### Response
```
{
  "users": [
    {
    "id": 2,
    "firstName": "Naruto",
    "lastName": "Uzumaki",
    "userName": "Hokage",
    "email": "naruto@konoha.com",
    "roleId": 2,
    "updatedAt": "2017-06-18T12:19:45.740Z",
    "createdAt": "2017-06-17T12:19:45.740Z"
    },
    {
    "id": 5,
    "firstName": "Boruto",
    "lastName": "Uzumaki",
    "userName": "Hokage",
    "email": "boruto@konoha.com",
    "roleId": 2,
    "updatedAt": "2017-06-18T12:19:45.740Z",
    "createdAt": "2017-06-17T12:19:45.740Z"
    },
    {
    "id": 2,
    "firstName": "Shriek",
    "lastName": "Iminazi",
    "userName": "Rutoka",
    "email": "rutoka@random.com",
    "roleId": 2,
    "updatedAt": "2017-06-18T12:19:45.740Z",
    "createdAt": "2017-06-17T12:19:45.740Z"
    }
  ],
  "paginationInfo": {
    "totalCount": 3,
    "currentPage": 1,
    "pageCount": 1,
    "pageSize": 3
  }
}
```

## Search Documents
#### Request
  - Endpoint **GET** `/search/documents?search=ee`
  - Requires `Authorization` header to be set
#### Response
```
{
  "documents": [
    {
      "id": 42,
      "title": "Black Sheep",
      "content": "Have you any wool?",
      "access": 1,
      "ownerId": 4,
      "createdAt": "2017-05-21T08:26:02.355Z",
      "updatedAt": "2017-05-28T17:58:26.800Z"
    },
    {
      "id": 53,
      "title": "Beautiful Lady",
      "content": "Have you seen the girl?",
      "access": 2,
      "ownerId": 4,
      "createdAt": "2017-05-26T13:30:58.441Z",
      "updatedAt": "2017-05-28T18:13:11.951Z"
    },
    {
      "id": 104,
      "title": "Weh don sir",
      "content": "Feel fly like a boss",
      "access": 3,
      "ownerId": 30
      "createdAt": "2017-05-26T13:31:03.171Z",
      "updatedAt": "2017-05-28T18:33:11.303Z"
    }
  ],
  "paginationInfo": {
    "totalCount": 3,
    "currentPage": 1,
    "pageCount": 1,
    "pageSize": 3
  }
}
```
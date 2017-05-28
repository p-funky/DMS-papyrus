import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';

import user from './server/routes/userRoutes';

const port = parseInt(process.env.PORT, 10) || 8000;

// Set up the express app
var app = express();

app.set('port', port);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(user());
// Setup a default all-route that sends back a welcome message in JSON format.
app.get('/*', (req, res) =>
  res.status(200).send('Welcome to PAPYRUS'));

const server = http.createServer(app);
server.listen(port);
/* eslint-disable */
console.log(`server started on port ${port}`);
/* eslint-enable */

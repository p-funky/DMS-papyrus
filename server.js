import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';


import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.dev';

import documents from './server/routes/documentsRoutes';
import user from './server/routes/userRoutes';


const port = parseInt(process.env.PORT, 10) || 8000;
const compiler = webpack(webpackConfig);

// Set up the express app
const app = express();

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.set('port', port);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(user());
app.use(documents());

// Setup a default landing page
app.get('/*', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, './client/index.html')));

const server = http.createServer(app);
server.listen(port);
/* eslint-disable */
console.log(`server started on port ${port}`);
/* eslint-enable */

module.exports = app;

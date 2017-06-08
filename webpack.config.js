var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'eventsource-polyfill',
    './client/index.jsx'
  ],
  target: 'web',
  output: {
    path: `${__dirname}/client/`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client'
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: '[name].css',
      allChunks: true,
    }),
  ],
  module: {
    loaders: [
      {
        test: /(\.css)$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url-loader?limit=8192',
      },
      {
        test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: [/\.js$/, /\.jsx$/],
        include: path.join(__dirname, 'client'),
        loaders: ['babel-loader']
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=4000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  node: {
    dns: 'empty',
    net: 'empty'
  }
};

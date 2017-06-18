import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

module.exports = {
  entry: [
    'eventsource-polyfill',
    path.join(__dirname, './client/Index.jsx'),
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    // new ExtractTextPlugin({ // define where to save the file
    //   filename: '[name].css',
    //   allChunks: true,
    // }),
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
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react'],
            },
          },
        ],
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=4000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.es6$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.jsx', '.js']
  },
  node: {
    dns: 'empty',
    net: 'empty'
  }
};

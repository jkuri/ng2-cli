'use strict';

const webpack           = require('webpack');
const Path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    polyfills: './src/polyfills',
    vendor: './src/vendor',
    app: './src/main'
  }, 
  output: {
    path: 'build/',
    publicPath: '',
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json'],
    root: '.',
    moduleDirectories: ['node_modules']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['ts', 'angular2-template-loader'] },
      { test: /\.html$/, loader: 'html' },
      { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file?name=assets/[name].[hash].[ext]' },
      { test: /\.css$/, exclude: Path.resolve('src', 'app'), loader: ExtractTextPlugin.extract('style', 'css?sourceMap') },
      { test: /\.css$/, include: Path.resolve('src', 'app'), loader: 'raw' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      chunksSortMode: 'dependency'
    }),
  ]
};

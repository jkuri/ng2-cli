'use strict';

const webpack             = require('webpack');
const Path                = require('path');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = {
  entry: {
    app: [
      './src/polyfills.ts', 
      './src/vendor.ts', 
      './src/main.ts'
    ]
  }, 
  output: {
    path: Path.resolve('./build'),
    publicPath: '',
    filename: '[name].bundle.js'
  },
  resolve: {
    root: Path.resolve('./src'),
    extensions: ['', '.ts', '.js'],
    moduleDirectories: ['node_modules']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.html$/, loader: 'html' },
      { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file?name=assets/[name].[hash].[ext]' },
      { test: /\.css$/, include: Path.resolve('src', 'app'), loader: 'raw' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  plugins: [
    new TsConfigPathsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      chunksSortMode: 'dependency',
      dev: true
    }),
  ],
  tslint: {
    emitErrors: true,
    failOnHint: true,
    resourcePath: 'src'
  }
};

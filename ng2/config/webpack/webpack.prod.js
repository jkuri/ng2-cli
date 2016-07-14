'use strict';

const webpack             = require('webpack');
const Path                = require('path');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const WebpackMd5          = require('webpack-md5-hash');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = {
  debug: false,
  devtool: 'source-map',
  entry: {
    app: [
      './src/polyfills', 
      './src/vendor', 
      './src/main'
    ]
  }, 
  output: {
    path: Path.resolve('./build'),
    publicPath: '',
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json'],
    root: Path.resolve('./src'),
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
    new WebpackMd5(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: { screw_ie8 : true },
      compress: { screw_ie8: true },
      comments: false
    })
  ],
  tslint: {
    emitErrors: true,
    failOnHint: true,
    resourcePath: 'src'
  },
  htmlLoader: {
    minimize: true,
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [
      [/#/, /(?:)/],
      [/\*/, /(?:)/],
      [/\[?\(?/, /(?:)/]
    ],
    customAttrAssign: [/\)?\]?=/]
  }
};

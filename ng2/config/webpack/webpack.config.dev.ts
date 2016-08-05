import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';

export function getDevConfig(): any {
  return {
    context: process.env.CLI_ROOT,
    entry: {
      app: [
        path.join(process.env.PWD, './src/polyfills'), 
        path.join(process.env.PWD, './src/vendor'),
        path.join(process.env.PWD, './src/main')
      ]
    }, 
    output: {
      path: path.join(process.env.PWD, './build'),
      publicPath: '',
      filename: '[name].bundle.js'
    },
    resolve: {
      root: path.join(process.env.PWD, './src'),
      extensions: ['', '.ts', '.js'],
      moduleDirectories: ['node_modules']
    },
    module: {
      loaders: [
        { test: /\.ts$/, loaders: [
          {
            loader: 'awesome-typescript-loader',
            query: { useForkChecker: true, tsconfig: path.join(process.env.PWD, `./src/tsconfig.json`) }
          }, 
          { loader: 'angular2-template-loader' }
        ], exclude: [/\.(spec|e2e)\.ts$/] },
        { test: /\.html$/, loader: 'html' },
        { test: /\.css$/, include: path.resolve('src', 'app'), loader: 'raw' },
        { test: /\.json$/, loader: 'json-loader' }
      ]
    },
    plugins: [
      new TsConfigPathsPlugin(),

      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
      }),

      new HtmlWebpackPlugin({
        template: path.join(process.env.PWD, './src/index.html'),
        filename: 'index.html',
        chunksSortMode: 'dependency',
        dev: true
      })
    ],
    tslint: {
      emitErrors: true,
      failOnHint: true,
      resourcePath: 'src'
    }
  }
};

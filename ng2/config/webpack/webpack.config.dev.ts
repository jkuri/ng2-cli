import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';

export function getDevConfig(): any {
  return {
    debug: true,
    devtool: 'cheap-module-source-map',
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
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },
    resolve: {
      root: path.join(process.env.PWD, './src'),
      extensions: ['', '.ts', '.js'],
      moduleDirectories: ['node_modules']
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            path.join(process.env.PWD, 'node_modules/rxjs'),
            path.join(process.env.PWD, 'node_modules/@angular'),
          ]
        }
      ],
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
      }),
      new CopyWebpackPlugin([{
        context: path.join(process.env.PWD, './public'),
        from: '**/*', 
        to: path.resolve(process.env.PWD, './dist')
      }])
    ],
    tslint: {
      emitErrors: false,
      failOnHint: false,
      resourcePath: 'src'
    },
    node: {
      global: 'window',
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  }
};

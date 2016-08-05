import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';

export function getDevConfig(): any {
  const projectRoot: string = process.env.PWD;
  return {
    name: 'main',
    debug: true,
    devtool: 'cheap-module-source-map',
    context: process.env.CLI_ROOT,
    entry: {
      app: [
        path.join(projectRoot, './src/polyfills'), 
        path.join(projectRoot, './src/vendor'),
        path.join(projectRoot, './src/main')
      ]
    }, 
    output: {
      path: path.join(projectRoot, './build'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },
    resolve: {
      root: path.join(projectRoot, './src'),
      extensions: ['', '.ts', '.js']
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            path.join(projectRoot, 'node_modules/rxjs'),
            path.join(projectRoot, 'node_modules/@angular'),
          ]
        }
      ],
      loaders: [
        { test: /\.ts$/, loaders: [
          {
            loader: 'awesome-typescript-loader',
            query: { useForkChecker: true, tsconfig: path.join(projectRoot, `./src/tsconfig.json`) }
          }, 
          { loader: 'angular2-template-loader' }
        ], exclude: [/\.(spec|e2e)\.ts$/] },
        { test: /\.html$/, loader: 'html' },
        { test: /\.css$/, include: path.join(projectRoot, 'src', 'app'), loader: 'raw' },
        { test: /\.json$/, loader: 'json-loader' }
      ]
    },
    plugins: [
      new TsConfigPathsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
      }),
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, './src/index.html'),
        filename: 'index.html',
        chunksSortMode: 'dependency',
        dev: true
      }),
      new CopyWebpackPlugin([{
        context: path.join(projectRoot, './public'),
        from: '**/*', 
        to: path.resolve(projectRoot, './build')
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

import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as WebpackMd5 from 'webpack-md5-hash';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';

export function getProdConfig(): any {
  return {
    context: process.env.CLI_ROOT,
    devtool: 'source-map',
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
      filename: '[name].[chunkhash].bundle.js',
      sourceMapFilename: '[name].[chunkhash].bundle.map',
      chunkFilename: '[id].[chunkhash].chunk.js'
    },
    resolve: {
      extensions: ['', '.ts', '.js', '.json'],
      root: path.join(process.env.PWD, './src'),
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
      new WebpackMd5(),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
      }),
      new HtmlWebpackPlugin({
        template: path.join(process.env.PWD, './src/index.html'),
        filename: 'index.html',
        chunksSortMode: 'dependency'
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: { screw_ie8: true },
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
  }
};

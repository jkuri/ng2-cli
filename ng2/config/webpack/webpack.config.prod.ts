import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as WebpackMd5 from 'webpack-md5-hash';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';

export function getProdConfig(): any {
  const projectRoot: string = process.env.PWD;
  return {
    name: 'main',
    context: process.env.CLI_ROOT,
    devtool: 'source-map',
    entry: {
      app: [
        path.join(projectRoot, './src/polyfills'), 
        path.join(projectRoot, './src/vendor'),
        path.join(projectRoot, './src/main')
      ]
    }, 
    output: {
      path: path.join(projectRoot, './build'),
      publicPath: '',
      filename: '[name].[chunkhash].bundle.js',
      sourceMapFilename: '[name].[chunkhash].bundle.map',
      chunkFilename: '[id].[chunkhash].chunk.js'
    },
    resolve: {
      extensions: ['', '.ts', '.js', '.json'],
      root: path.join(projectRoot, './src')
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
        ], exclude: [/\.(spec|e2e)\.ts$/ },
        { test: /\.html$/, loader: 'html' },
        { test: /\.css$/, include: path.join(projectRoot, 'src', 'app'), loader: 'raw' },
        { test: /\.json$/, loader: 'json-loader' }
      ]
    },
    plugins: [
      new TsConfigPathsPlugin(),
      new WebpackMd5(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        minChunks: Infinity,
        name: 'inline',
        filename: 'inline.js',
        sourceMapFilename: 'inline.map'
      }),
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, './src/index.html'),
        filename: 'index.html',
        chunksSortMode: 'dependency'
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: { screw_ie8 : true, keep_fnames: true },
        compress: { screw_ie8: true },
        comments: false
      }),
      new CopyWebpackPlugin([{
        context: path.resolve(projectRoot, './public'),
        from: '**/*',
        to: path.resolve(projectRoot, './build')
      }])
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

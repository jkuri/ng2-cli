import * as path from 'path';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import { Config } from '../../lib/config';
import { Helper } from '../../lib/helper';

const config: any = new Config();
const helper: any = new Helper();

export function getCSSConfig() {
  const projectRoot: string = process.env.PWD;
  const styles = config.getJSON().apps.map(app => app.styles);
  let entries = {};

  styles.forEach(style => {
    for (let src in style) {
      if (helper.existsSync(path.resolve(projectRoot, src))) {
        entries[style[src].output] = path.resolve(projectRoot, `./${src}`);
      }
    }
  });

  return {
    name: 'styles',
    context: process.env.CLI_ROOT,
    resolve: {
      root: path.resolve(projectRoot)
    },
    entry: entries,
    output: {
      path: path.join(projectRoot, './build'),
      filename: '[name]'
    },
    module: {
      loaders: [
        { test: /\.css$/i, loader: ExtractTextPlugin.extract(['css-loader']) },
        { test: /\.sass$|\.scss$/i, loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']) },
        { test: /\.less$/i, loader: ExtractTextPlugin.extract(['css-loader', 'less-loader']) },
        { test: /\.styl$/i, loader: ExtractTextPlugin.extract(['css-loader', 'stylus-loader']) }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name]')
    ]
  }
};

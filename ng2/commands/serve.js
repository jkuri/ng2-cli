'use strict';

const dir         = require('../lib/dir');
const utils       = require('../lib/utils');
const path        = require('path');
const chalk       = require('chalk');
const webpack     = require('webpack');
const webpser     = require('webpack-dev-server');

let server;

module.exports = (cli, config) => {
  return cli
    .command('serve', 'Build and serves your app')
    .option('--path, -p <path>', 'Destination path.')
    .validate((args, cb) => {
      if (!dir.isDirBuildable()) {
        cli.ui.log(chalk.yellow(`Cannot build outside of the project dir.`));
        return false;
      }
    })
    .action((args, cb) => {
      let config = require(path.join(process.env.CLI_ROOT, 'config/webpack/webpack.config.js'));
      let compiler = webpack(config);      

      server = new webpser(compiler, {
        stats: { colors: true }
      });

      cli.ui.log(chalk.yellow(`Building...`));
      server.listen(4200);
    })
    .cancel(() => {
      cli.ui.log(chalk.yellow(`Server successfully stopped.`));
      server.close();
    });
};

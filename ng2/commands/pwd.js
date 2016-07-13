'use strict';

const chalk = require('chalk');
const path  = require('path');

module.exports = (cli, config) => {
  return cli
    .command('pwd', 'Return current working directory.')
    .action((args, cb) => {
      cli.ui.log(chalk.yellow(path.resolve(process.cwd())));
      cb();
    });
};

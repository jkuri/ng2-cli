'use strict';

const chalk = require('chalk');
const path  = require('path');
const dir   = require('../lib/dir');

module.exports = (cli, config) => {
  return cli
    .command('cd', 'Change current working directory.')
    .option('--path, -p <path>', 'Path')
    .action((args, cb) => {
      let params = args.options;

      if (dir.isDir(params.path)) {
        process.chdir(params.path);
        cli.ui.log(chalk.yellow(`Current working directory: ${path.resolve(process.cwd())}`));
      } else {
        cli.ui.log(chalk.red(`Directory does not exists.`));
      }

      cb();
    });
};

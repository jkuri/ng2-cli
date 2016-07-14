'use strict';

const Chalk = require('chalk');
const Path  = require('path');
const Dir   = require('../lib/dir');

module.exports = (cli, config) => {
  return cli
    .command('cd [path]', 'Change current working directory.')
    .action((args, cb) => {
      const path = args.path;
      if (Dir.isDir(path)) {
        process.chdir(path);
        cli.ui.log(Chalk.yellow(`Current working directory: ${Path.resolve(process.cwd())}`));
      }

      cb();
    });
};

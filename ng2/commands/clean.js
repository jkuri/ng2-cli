'use strict';

const Chalk = require('chalk');
const Path  = require('path');
const Dir   = require('../lib/dir');

module.exports = (cli, config) => {
  return cli
    .command('clean', 'Removes the build/ directory.')
    .action((args, cb) => {
      let path = Path.resolve(process.cwd(), 'build');
      if (Dir.isDir(path) && Dir.removeDir(path)) {
        cli.ui.log(Chalk.yellow(`build/ directory successfully deleted.`));
      }

      cb();
    });
};

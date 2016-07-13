'use strict';

module.exports = (cli, config) => {
  return cli
    .command('info', 'Prints the info about the current project')
    .action((args, cb) => {

      cb();
    });
};

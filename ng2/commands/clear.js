'use strict';

module.exports = (cli, config) => {
  return cli
    .command('clear', 'Clear the terminal screen.')
    .action((args, cb) => {
      process.stdout.write('\u001B[2J\u001B[0;0f');
      cb();
    });
};

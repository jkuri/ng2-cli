'use strict';

module.exports = (server, cli) => {
  return server
    .command('quit', 'Get back to the main TTY.')
    .alias('q')
    .action((args, cb) => {
      cli.show();
      cb();
    });
};

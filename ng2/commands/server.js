'use strict';

module.exports = (cli, server) => {
  return cli
    .command('server', 'Switch to server TTY instance.')
    .action((args, cb) => {
      server.show();
      cb();
    });
};

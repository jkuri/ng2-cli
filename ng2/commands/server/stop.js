'use strict';

const chalk = require('chalk');

module.exports = (server) => {
  return server
    .command('stop', 'Stops the running server.')
    .action((args, cb) => {
      if (server.status) {
        server.server.close();
      } else {
        server.ui.log(chalk.red(`Cannot stop the server as it is not running.`));
      }

      cb();
    });
};

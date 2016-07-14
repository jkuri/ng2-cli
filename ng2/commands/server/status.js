'use strict';

const chalk = require('chalk');

module.exports = (server) => {
  return server
    .command('status', 'Get the current status of the server.')
    .action((args, cb) => {
      if (server.status) {
        server.ui.log(chalk.yellow(`Server is running on port ${server.port}.`));
      } else {
        server.ui.log(chalk.yellow('Server is not running.'));
      }

      cb();
    });
};

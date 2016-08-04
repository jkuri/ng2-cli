import * as chalk from 'chalk';

export function statusServerCommand(server: any): any {
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

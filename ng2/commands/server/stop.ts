import * as chalk from 'chalk';

export function stopServerCommand(server: any): any {
  return server
    .command('stop', 'Stops the running server.')
    .alias('kill')
    .action((args, cb) => {
      if (server.status) {
        server.server.close();
        server.status = false;
        server.port = null;
        server.ui.log(chalk.green('Server successfully stopped.'));
      } else {
        server.ui.log(chalk.red('Cannot stop the server as it is not running.'));
      }

      cb();
    });
};

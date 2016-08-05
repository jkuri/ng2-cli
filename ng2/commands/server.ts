import * as chalk from 'chalk';
import { Dir } from '../lib/dir';

const dir: any = new Dir();

export function serverCommand(cli: any, server: any): any {
  return cli
    .command('server', 'Switch to server TTY instance.')
    .validate((args, cb) => {
      if (!dir.isDirBuildable()) {
        cli.ui.log(chalk.yellow('Cannot get info outside of a project.'));
        return false;
      }
    })
    .action((args, cb) => {
      server.show();
      cb();
    });
};

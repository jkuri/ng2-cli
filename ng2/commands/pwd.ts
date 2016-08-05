import * as path from 'path';
import * as chalk from 'chalk';
import { Dir } from '../lib/dir';

const dir: any = new Dir();

export function pwdCommand(cli: any): any {
  return cli
    .command('pwd', 'Return current working directory.')
    .action((args, cb) => {
      if (dir.isDirBuildable()) {
        cli.ui.log(chalk.green('You are inside of a project root.'));
      }
      cli.ui.log(chalk.yellow(path.resolve(process.cwd())));
      cb();
    });
};

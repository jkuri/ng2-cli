import * as path from 'path';
import * as chalk from 'chalk';

export function pwdCommand(cli: any): any {
  return cli
    .command('pwd', 'Return current working directory.')
    .action((args, cb) => {
      cli.ui.log(chalk.yellow(path.resolve(process.cwd())));
      cb();
    });
};

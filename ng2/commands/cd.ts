import * as chalk from 'chalk';
import * as path from 'path';
import { Dir } from '../lib/dir';

const dir: any = new Dir();

export function cdCommand(cli: any): any {
  return cli
    .command('cd [path]', 'Change current working directory.')
    .action((args, cb) => {
      const path = args.path;
      if (dir.isDir(path)) {
        process.chdir(path);
        cli.ui.log(chalk.yellow(`Current working directory: ${path.resolve(process.cwd())}`));
      }

      cb();
    });
};

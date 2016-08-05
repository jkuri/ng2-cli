import * as chalk from 'chalk';
import * as path from 'path';
import { Dir } from '../lib/dir';

const dir: any = new Dir();

export function cdCommand(cli: any): any {
  return cli
    .command('cd [path]', 'Change current working directory.')
    .action((args, cb) => {
      const dirPath = args.path;
      if (dir.isDir(dirPath)) {
        process.chdir(dirPath);
        process.env.PWD = path.resolve(dirPath);
        if (dir.isDirBuildable()) {
          cli.ui.log(chalk.green('You are inside of a project root.'));
        } else {
          cli.ui.log(chalk.yellow(`Current working directory: ${path.resolve(process.cwd())}`));
        }
      }

      cb();
    });
};

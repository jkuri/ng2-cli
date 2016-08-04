import * as chalk from 'chalk';
import * as path from 'path';
import { Dir } from '../lib/dir';

const dir: any = new Dir();

export function cleanCommand(cli: any): any {
  return cli
    .command('clean', 'Removes the build/ directory.')
    .action((args, cb) => {
      let dirPath: string = path.resolve(process.cwd(), 'build');
      if (dir.isDir(dirPath) && dir.removeDir(dirPath)) {
        cli.ui.log(chalk.yellow('build/ directory successfully deleted.'));
      }

      cb();
    });
};

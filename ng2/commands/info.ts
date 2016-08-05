import * as path from 'path';
import * as fs from 'fs';
import * as chalk from 'chalk';
import { Dir } from '../lib/dir'; 

const dir: any = new Dir();

export function infoCommand(cli: any): any {
  return cli
    .command('info', 'Prints the info about the current project')
    .validate((args, cb) => {
      if (!dir.isDirBuildable()) {
        cli.ui.log(chalk.yellow('Cannot get info outside of a project.'));
        return false;
      }
    })
    .action((args, cb) => {
      let jsonPath = path.resolve('./ng2-cli.json');
      let contents = fs.readFileSync(jsonPath, 'utf8');
      cli.ui.log(chalk.yellow('Project info:'));
      cli.ui.log(contents);
      cb();
    });
};

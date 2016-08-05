import { Dir } from '../lib/dir';
import { Npm } from '../lib/npm';
import { Utils } from '../lib/utils';
import { Blueprint } from '../lib/blueprint';
import * as chalk from 'chalk';

export function newCommand(cli: any): any {
  const dir: any = new Dir();
  const npm: any = new Npm();
  const utils: any = new Utils();

  return cli
    .command('new [name]', 'Generate new Angular2 project.')
    .option('--path, -p <path>', 'Destination path.')
    .option('--skip-npm, -sn', 'Skip npm packages installation.')
    .option('--skip-git, -sg', 'Skip git initialization.')
    .types({
      string: ['name', 'n', 'directory', 'd'],
      boolean: ['skip-npm', 'sn', 'skip-git', 'sg']
    })
    .validate((args) => {
      if (dir.isDirBuildable()) {
        cli.ui.log(chalk.yellow('Cannot run `new` inside of a project.'));
        return false;
      }

      let name = args.name;
      let valid = true;
      if (!name) {
        cli.ui.log(chalk.yellow('Project name is mandatory'));
        valid = false;
      } else if (name.length < 2) {
        cli.ui.log(chalk.yellow('Name of a project must be at least 2 chars long.'));
        valid = false;
      }

      return valid;
    })
    .action((args, cb) => {
      let params = args.options;
      params.name = args.name;
      params.path = params.parh ? params.path : '.';
      const fullPath = dir.joinPath(params.path, params.name);

      dir.makeDir(params.path, params.name)
      .then(() => cli.ui.log(chalk.green(`Directory successfully initialized at ${fullPath}.`)))
      .then(() => {
        process.chdir(fullPath);
        process.env.PWD = fullPath;
        let blueprint = new Blueprint('project', '', { name: params.name });
        return blueprint.generate();
      })
      .then(() => {
        cli.ui.log(chalk.yellow('Installing npm dependencies, this can take a while...'));
        return npm.install(null, cli);
      })
      .then(() => {
        cli.ui.log(chalk.green('Project successfully initialized.'));
        cb();
      })
      .catch(err => {
        cli.ui.log(chalk.red(err));
        cb();
      });
    })
    .cancel(() => {
      utils.stopSpinner();
    });
};

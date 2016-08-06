import * as chalk from 'chalk';
import { Blueprint } from '../lib/blueprint';
import { String } from '../lib/string';
import { Dir } from '../lib/dir';

const dir = new Dir();

const models: Array = [
  'component',
  'directive',
  'service',
  'pipe',
  'interface'
];

export function generateCommand(cli: any): any {
  return cli
    .command('generate [model] [name]', 'Generate scaffold from blueprints.')
    .validate((args, cb) => {
      if (!dir.isDirBuildable()) {
        cli.ui.log(chalk.yellow('Cannot generate blueprints outside of a project.'));
        return false;
      }
      if (models.indexOf(args.model) === -1) {
        cli.ui.log(chalk.red(`Blueprint ${args.model} does not exists.`));
        return false;
      }
      if (args.name.length < 2) {
        cli.ui.log(chalk.red('Please provide correct name for a model.'));
        return false;
      }
    })
    .action((args, cb) => {
      let model = args.model;
      let name = args.name;
      const strUtils = new String(args.name);
      let data = {
        name: args.name,
        dasherizedName: strUtils.getDasherizedName(),
        classifiedName: strUtils.getClassifiedName()
      };
      let blueprint = new Blueprint(model, name, data);

      blueprint.generate().then(() => cb());
    });
};

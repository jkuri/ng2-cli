import * as chalk from 'chalk';
import { Blueprint } from '../lib/blueprint';
import { String } from '../lib/string';

const strUtils = new String();

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
      let data = {
        name: args.name,
        dasherizedName: strUtils.getDasherizedName(args.name),
        classifiedName: strUtils.getClassifiedName(args.name)
      };
      let blueprint = new Blueprint(model, name, data);

      blueprint.generate().then(() => cb());
    });
};

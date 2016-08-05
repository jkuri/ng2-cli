import { Blueprint } from '../lib/blueprint';

export function generateCommand(cli: any): any {
  return cli
    .command('generate [model] [name]', 'Generate scaffold from blueprints.')
    .action((args, cb) => {
      let model = args.model;
      let name = args.name;
      let blueprint = new Blueprint(model, name);

      blueprint.generate().then(() => cb());
    });
};

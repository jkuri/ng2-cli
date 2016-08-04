export function generateCommand(cli: any): any {
  return cli
    .command('generate', 'Generate scaffold from blueprints.')
    .action((args, cb) => {
      
      cb();
    });
};

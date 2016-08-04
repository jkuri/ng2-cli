export function infoCommand(cli: any): any {
  return cli
    .command('info', 'Prints the info about the current project')
    .action((args, cb) => {

      cb();
    });
};

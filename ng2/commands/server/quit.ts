export function quitServerCommand(server: any, cli: any): any {
  return server
    .command('quit', 'Get back to the main TTY.')
    .alias('q')
    .action((args, cb) => {
      cli.show();
      cb();
    });
};

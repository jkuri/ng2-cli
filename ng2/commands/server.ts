export function serverCommand(cli: any, server: any): any {
  return cli
    .command('server', 'Switch to server TTY instance.')
    .action((args, cb) => {
      server.show();
      cb();
    });
};

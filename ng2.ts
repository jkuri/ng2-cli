import * as instances from './ng2/lib/instances';
import * as commands from './ng2/commands/';

process.chdir(process.cwd());

let main: any = instances.create('main', 'ng2$');
let server: any = instances.create('server', 'ng2-serve$');

server.status = false;

commands.newCommand(main);
commands.cdCommand(main);
commands.pwdCommand(main);
commands.clearCommand(main);
commands.cleanCommand(main);
commands.infoCommand(main);
commands.buildCommand(main);
commands.generateCommand(main);
commands.findCommand(main);
commands.serverCommand(main, server);
commands.startServerCommand(server);
commands.statusServerCommand(server);
commands.stopServerCommand(server);
commands.clearCommand(server);
commands.quitServerCommand(server, main);

main.show();

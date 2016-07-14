'use strict';

const instances = require('./ng2/lib/instances');
const chalk     = require('chalk');

process.chdir(process.cwd());

let main    = instances.create('main', 'ng2$');
let server  = instances.create('server', 'ng2-serve$');

server.status = false;

require('./ng2/commands/new')(main);
require('./ng2/commands/build')(main);
require('./ng2/commands/info')(main);
require('./ng2/commands/pwd')(main);
require('./ng2/commands/cd')(main);
require('./ng2/commands/clear')(main);
require('./ng2/commands/clean')(main);
require('./ng2/commands/server')(main, server);
require('./ng2/commands/server/start')(server);
require('./ng2/commands/server/status')(server);
require('./ng2/commands/server/stop')(server);
require('./ng2/commands/clear')(server);
require('./ng2/commands/server/quit')(server, main);

main.show();

'use strict';

const cli   = require('vorpal')();
const chalk = require('chalk');

process.chdir(process.cwd());

require('./ng2/commands/new')(cli);
require('./ng2/commands/serve')(cli);
require('./ng2/commands/build')(cli);
require('./ng2/commands/info')(cli);
require('./ng2/commands/pwd')(cli);
require('./ng2/commands/cd')(cli);
require('./ng2/commands/clear')(cli);

cli.delimiter(chalk.bold('ng2$')).show();
cli.show().parse(process.argv);

'use strict';

const cli = require('vorpal')();

require('./ng2/commands/new')(cli);
require('./ng2/commands/clear')(cli);


cli.delimiter('ng2$').show();
cli.show().parse(process.argv);

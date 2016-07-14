'use strict';

const dir         = require('../../lib/dir');
const utils       = require('../../lib/utils');
const helper      = require('../../lib/helper');
const path        = require('path');
const chalk       = require('chalk');
const webpack     = require('webpack');
const webserv     = require('webpack-dev-server');
const open        = require('open');

let server;
let isRunning = false;

module.exports = (s) => {
  return s
    .command('start', 'Build and serves your app')
    .option('--port, -p <port>', 'Server port.')
    .types({
      string: ['port']
    })
    .validate((args, cb) => {
      if (!dir.isDirBuildable()) {
        s.ui.log(chalk.yellow(`Cannot run server outside of the project directory.`));
        return false;
      }
    })
    .action((args, cb) => {
      let port = helper.isInt(args.options.port) ? parseInt(args.options.port, 10) : 4200;
      let config = require(path.join(process.env.CLI_ROOT, 'ng2/config/webpack/webpack.dev.js'));
      let compiler = webpack(config);      

      server = new webserv(compiler, {
        contentBase: './src',
        quiet: true,
        watchOptions: {
          aggregateTimeout: 1000,
          poll: 100
        }
      });

      server.listen(port, () => {
        s.status = true;
        s.port = port;
        s.ui.log(chalk.yellow(`Server running at port ${port}`));
        open(`http://localhost:${port}`);
      });

      s.server = server;

      cb();
    })
    .cancel(() => {
      s.ui.log(chalk.yellow(`Server successfully stopped.`));
      server.close();
    });
};

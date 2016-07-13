'use strict';

const dir     = require('../lib/dir');
const utils   = require('../lib/utils');
const path    = require('path');
const chalk   = require('chalk');
const webpack = require('webpack');
const moment  = require('moment');

let server;

module.exports = (cli, config) => {
  return cli
    .command('build', 'Builds your app')
    .action((args, cb) => {
      let webpackConfig = require(path.join(process.env.CLI_ROOT, 'config/webpack/webpack.config.js'));
      let compiler = webpack(webpackConfig);

      cli.ui.log(chalk.yellow(`Building...`));
      utils.startSpinner();

      compiler.run((err, stats) => {
        if (err) {
          utils.stopSpinner();
          cli.ui.log(chalk.red(err));
        } else {
          stats = stats.toJson({
            hash: false,
            version: false,
            timings: true,
            assets: true,
            chunks: false,
            modules: false,
            children: false,
            cache: false,
            reasons: false,
            source: false,
            errorDetails: false
          });

          utils.stopSpinner();
          let time = moment.duration(stats.time).seconds();
          cli.ui.log(chalk.green(`Build project successfully. \nBuild Time: ${time}s`));
        }

        cb();
      });

    })
    .cancel(() => {
      cli.ui.log(chalk.red(`Build has stopped.`));
    });
};

'use strict';

const dir   = require('../lib/dir');
const npm   = require('../lib/npm');
const utils = require('../lib/utils');
const chalk = require('chalk');

module.exports = (cli, config) => {
  return cli
    .command('new [name]', 'Generate new Angular2 project.')
    .option('--path, -p <path>', 'Destination path.')
    .option('--skip-npm, -sn', 'Skip npm packages installation.')
    .option('--skip-git, -sg', 'Skip git initialization.')
    .types({
      string: ['name', 'n', 'directory', 'd'],
      boolean: ['skip-npm', 'sn', 'skip-git', 'sg']
    })
    .validate((args) => {
      let params = args.options;
      let name = args.name;
      let valid = true;
      
      if (!name) {
        cli.ui.log('- project name is mandatory');
        valid = false;
      } else if (name.length < 2) {
        cli.ui.log('- name of a project must be at least 2 chars long.');
        valid = false;
      }

      return valid;
    })
    .action((args, cb) => {
      let params = args.options;
      params.name = args.name;
      params.path = params.parh ? params.path : '.';
      const fullPath = dir.joinPath(params.path, params.name);

      dir.makeDir(params.path, params.name)
      .then(() => cli.ui.log(chalk.green(`Directory successfully initialized at ${fullPath}.`)))
      .then(() => {
        cli.ui.log(chalk.yellow('Copying project files into destination directory.'));
        return dir.copy(null, fullPath, null, cli);
      })
      .then(() => {
        process.chdir(fullPath);
        cli.ui.log(chalk.yellow('Installing npm dependencies, this can take a while...'));
        return npm.install(null, cli);
      })
      .then(() => {
        cli.ui.log(chalk.green('Project successfully initialized.'));
        cb();
      })
      .catch(err => {
        cli.ui.log(chalk.red(err));
        cb();
      });
    })
    .cancel(() => {
      utils.stopSpinner();
    });
};

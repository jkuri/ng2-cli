'use strict';

const dir = require('../lib/dir');
const npm = require('../lib/npm');

module.exports = (cli, config) => {
  return cli
    .command('new', 'Generate new Angular2 project')
    .option('--name, -n <name>', 'Name of a project')
    .option('--path, -p <path>', 'Destination path.')
    .option('--skip-npm, -sn', 'Skip npm packages installation.')
    .option('--skip-git, -sg', 'Skip git initialization.')
    .types({
      string: ['name', 'n', 'directory', 'd'],
      boolean: ['skip-npm', 'sn', 'skip-git', 'sg']
    })
    .validate((args) => {
      let params = args.options;
      let valid = true;
      
      if (!params.name) {
        cli.ui.log('- project name is mandatory');
        valid = false;
      } else if (params.name.length < 2) {
        cli.ui.log('- name of a project must be at least 2 chars long.');
        valid = false;
      }

      if (!params.path || params.path.length < 2 && params.name.length < 2) {
        cli.ui.log('- destination directory is not specified.');
        valid = false;
      }

      return valid;
    })
    .action((args, cb) => {
      let params = args.options;
      params.name = params.name.toLowerCase();
      const fullPath = dir.joinPath(params.path, params.name);

      dir.makeDir(params.path, params.name).
      then(() => {
        cli.ui.log(`Directory successfully initialized at ${fullPath}.`);
      }, err => {
        cli.ui.log(`Unable to make directory at ${fullPath} (${err}).`);
        cb();
      }).
      then(() => {
        cli.ui.log(`Copying project files into destination directory.`);
        dir.copy(null, fullPath, null, cli)
        .then(() => {
          process.chdir(fullPath);
          cli.ui.log('Installing npm dependencies, this can take a while...');
          npm.install().
          then(() => {
            cli.ui.log('Done.');
            cb();
          }, err => {
            cli.ui.log(err);
            cb();
          });
        }, err => {
          cli.ui.log(`Unable to copy files (${err}).`);
        })
      });
    })
    .cancel(() => {

    });
};

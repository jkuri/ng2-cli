import * as walk from 'walk';
import * as chalk from 'chalk';
import * as path from 'path';

export function findCommand(cli: any): any {
  return cli
    .command('find', 'Find for projects in current directory.')
    .action((args, cb) => {
      let projects = [];
      cli.ui.log(`Searching for projects in ${process.cwd()}...`);
      
      walk.walk(process.cwd(), {
        followLinks: false,
        filters: ['node_modules', 'blueprints', '.git']
      }).on('file', (root, fileStat, next) => {
        let name = path.basename(fileStat.name);
        if (name === 'ng2-cli.json') {
          projects.push(root);
        }
        next();
      }).on('end', () => {
        if (projects.length) {
          projects.forEach(project => {
            cli.ui.log(chalk.green(`${project}`));
          });
        } else {
          cli.ui.log('No results.');
        }
        cb();
      });
    });
};
import * as chalk from 'chalk';
import * as webpack from 'webpack';
import * as progress from 'webpack/lib/ProgressPlugin';
import { getProdConfig, getCSSConfig } from '../config/webpack/';
import { Dir } from '../lib/dir';

const dir: any = new Dir();

export function buildCommand(cli: any): any {
  return cli
    .command('build', 'Builds your app.')
    .validate((args, cb) => {
      if (!dir.isDirBuildable()) {
        cli.ui.log(chalk.yellow('Cannot build outside of the project directory.'));
        return false;
      }
    })
    .action((args, cb) => {
      let config = getProdConfig();
      let cssConfig = getCSSConfig();
      let compiler = webpack([config, cssConfig]);

      compiler.apply(new progress((percentage, msg) => {
        if (percentage !== 1) {
          cli.ui.redraw(`Building: ${Math.ceil(percentage * 100)}%`);
        } else {
          cli.ui.redraw.clear();
          cli.ui.redraw.done();
        }
      }));

      compiler.run((err, stats) => {
        if (err) {
          cli.ui.log(chalk.red(err));
        } else {
          let prettyStats = stats.toString({
            assets: true,
            timings: true,
            cached: false,
            modules: false,
            warnings: false,
            chunkModules: false
          });

          if (!stats.hasErrors()) {
            cli.ui.log(`${prettyStats}`);
            cli.ui.log(chalk.green(`Build project successfully.`));
          } else {
            cli.ui.log(chalk.red(`Build failed.`));
            stats.errors.forEach(error => {
              cli.ui.log(error);
            });
          }
        }

        cb();
      });

    })
    .cancel(() => {
      cli.ui.log(chalk.red('Build has been canceled.'));
    });
};

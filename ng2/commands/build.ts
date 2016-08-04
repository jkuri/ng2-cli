import * as path from 'path';
import * as chalk from 'chalk';
import * as webpack from 'webpack';
import * as moment from 'moment';
import * as progress from 'webpack/lib/ProgressPlugin';

export function buildCommand(cli: any): any {
  return cli
    .command('build', 'Builds your app.')
    .action((args, cb) => {
      let config = require(path.join(process.env.CLI_ROOT, 'ng2/config/webpack/webpack.prod.js'));
      let compiler = webpack(config);

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

          let s = moment.duration(stats.time).seconds();
          let millis = moment.duration(stats.time).milliseconds();
          cli.ui.log(chalk.green(`Build project successfully in ${s}.${millis}s.`));
        }

        cb();
      });

    })
    .cancel(() => {
      cli.ui.log(chalk.red('Build has been canceled.'));
    });
};

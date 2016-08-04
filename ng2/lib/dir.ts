import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';
import * as glob from 'glob';
import * as chalk from 'chalk';
import * as helper from './helper';

export class Dir {
  isDir(dirPath: string): boolean {
    dirPath = path.resolve(dirPath);

    try {
      const stats = fs.statSync(path);
      return stats.isDirectory();
    } catch (e) {
      console.log(chalk.red(`Directory ${path} does not exists.`));
      return false;
    }
  }

  removeDir(dirPath: string): boolean {
    dirPath = path.resolve(dirPath);

    try {
      if (this.isDir(path)) {
        fse.remove(path);
        return true;
      }
    } catch (e) {
      console.log(chalk.red(`Error while deleting ${path} (${e}).`));
      return false;
    }
  }

  joinPath(dirPath: string, dirName: string): string {
    const p = path.join(dirPath, dirName);
    return (!path.isAbsolute(p)) ? path.resolve(p) : p;
  }

  makeDir(dirPath: string, dirName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      dirPath = this.joinPath(dirPath, dirName);

      try { 
        fse.mkdirsSync(dirPath);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  isDirBuildable(): boolean {
    let config = path.join(process.cwd(), 'angular-cli.json');
    return (helper.existsSync(config)) ? true : false;
  }

  copy(srcDir: string, destDir: string, opts: Object, cli: any): Promise<void> {
    if (!srcDir) {
      srcDir = path.join(process.env.CLI_ROOT, 'ng2/blueprints/app');
    }
    let options: Object = { clobber: true };

    if (opts) {
      options = Object.assign({}, options, opts);
    }

    return new Promise((resolve, reject) => {
      try {
        fse.copySync(srcDir, destDir, options);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
}

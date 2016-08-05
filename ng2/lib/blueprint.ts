import * as path from 'path';
import * as fse from 'fs-extra';
import * as _ from 'lodash';
import * as chalk from 'chalk';
import { Dir } from './dir';
import { Helper } from './helper';

const dir = new Dir();
const helper = new Helper();

export class Blueprint {
  private model: string;
  private name: string;
  private data: any;
  private destDir: string;
  private modelDir: string;

  constructor(
    model: string,
    name: string,
    data?: any
  ) {
    this.model = model.toLowerCase();
    this.name = name;
    this.data = data || {};
    this.destDir = this._getDestDir();
    this.modelDir = this._getDir();
  }

  generate(): Promise<void> {
    const that = this;

    return new Promise(resolve => {
      this._getFiles().then(files => {
        console.log(chalk.green(`Generating files from \`${this.model}\`.`));
        files.forEach(file => {
          that._generateAndSave(file);
        });
        console.log(chalk.green('Successfully generated.'));
        resolve();
      });
    });
  }

  private _generateAndSave(filePath: string): void {
    let splitted = filePath.split(path.sep);
    let part = splitted.filter(p => {
      return splitted.indexOf(p) > splitted.indexOf(this.model);
    }).join('/');
    let to;
    if (this.model !== 'project') {
      to = path.join('src', 'app', `${this.model}s`,
        this.name, path.basename(part).replace(/name/, this.name));
    } else {
      to = part;
    }

    try {
      if (!dir.isDir(filePath)) {
        let contents = fse.readFileSync(filePath, 'utf8');
        let template = _.template(contents, { variable: 'data' });
        fse.outputFileSync(to, template(this.data), 'utf8');
        console.log(`  ${to}`);
      } else {
        if (!helper.existsSync(to)) {
          fse.mkdirsSync(to);
        }
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  private _getDestDir(): string {
    let subDir = this.model === 'app' ? './' : `${this.model}s`;
    return path.join(process.env.PWD, subDir);
  }

  private _getDir(): string {
    let modelDir = path.join(process.env.CLI_ROOT,
      `ng2/blueprints/${this.model}`);
    if (dir.isDir(modelDir)) {
      return modelDir;
    } else {
      throw new Error('Blueprint does not exists.');
    }
  }

  private _getFiles(): Promise<Array> {
    let files = [];

    return new Promise(resolve => {
      fse.walk(this.modelDir)
      .on('data', (item) => {
        files.push(item.path);
      })
      .on('end', () => {
        resolve(files);
      });
    });
  }

}

import * as fse from 'fs-extra';
import * as path from 'path';
import { Helper } from './helper';

const helper: any = new Helper();

export class Config {
  getJSON(): any {
    const configPath = path.resolve(process.env.PWD, 'ng2-cli.json');
    if (helper.existsSync(configPath)) {
      return fse.readJsonSync(configPath);
    } else {
      throw new Error('Config file not found.');
    }
  }
};

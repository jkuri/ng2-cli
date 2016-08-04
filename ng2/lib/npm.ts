import * as npm from 'npm';
import { Utils } from './utils';

export class Npm {
  private npm: any;
  private options: Object;
  private utils: any;

  constructor() {
    this.npm = npm;
    this.utils = new Utils();
    this.options = {
      loglevel: 'silent',
      progress: false,
      logstream: null,
      color: 'always',
      optional: true,
      save: true,
      'save-dev': true,
      'save-exact': false,
      depth: 0
    }
  }

  install(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.utils.startSpinner();

      npm.load(this.options, err => {
        npm.commands.install('', [], (err) => {
          this.utils.stopSpinner();
          resolve();
        });
      });
    });
  }
}


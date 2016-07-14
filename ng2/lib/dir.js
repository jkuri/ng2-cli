'use strict';

const Fs      = require('fs');
const Fse     = require('fs-extra');
const Path    = require('path');
const Glob    = require('glob');
const Helper  = require('./helper');
const Chalk   = require('chalk');

exports.isDir = (path) => {
  path = Path.resolve(path);

  try {
    const stats = Fs.statSync(path);
    return stats.isDirectory();
  } catch (e) {
    console.log(Chalk.red(`Directory ${path} does not exists.`));
    return false;
  }
};

exports.removeDir = (path) => {
  path = Path.resolve(path);

  try {
    if (this.isDir(path)) {
      Fse.remove(path);
      return true;
    }
  } catch (e) {
    console.log(Chalk.red(`Error while deleting ${path} (${e}).`));
    return false;
  }
};

exports.joinPath = (path, dir) => {
  const p = Path.join(path, dir);
  return (!Path.isAbsolute(p)) ? Path.resolve(p) : p;
};

exports.makeDir = (path, dir) => {
  return new Promise((resolve, reject) => {
    const dirPath = this.joinPath(path, dir);

    try { 
      Fse.mkdirsSync(dirPath);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

exports.copy = (srcDir, destDir, opts, cli) => {
  if (!srcDir) {
    srcDir = Path.join(process.env.CLI_ROOT, 'ng2/blueprints/app');
  }
  let options = {
    clobber: true
  };

  if (opts) {
    options = Object.assign({}, options, opts);
  }

  return new Promise((resolve, reject) => {
    // if (cli) {
    //   let items = [];
    //   Fse.walk(srcDir).on('data', (item) => {
    //     items.push(item);
    //   }).on('end', () => {
    //     console.dir(items);
    //   });
    // }

    try {
      Fse.copySync(srcDir, destDir, options);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

exports.isInitializable = (dir) => {
  return true;
};

exports.isDirBuildable = (dir) => {
  let config = Path.join(process.cwd(), 'angular-cli.json');
  return (Helper.existsSync(config)) ? true : false;
};

'use strict';

const npm   = require('npm');
const utils = require('./utils');

const npmOptions = {
  loglevel: 'silent',
  progress: false,
  logstream: null,
  color: 'always',
  optional: true,
  save: true,
  'save-dev': true,
  'save-exact': false,
  depth: 0
};

exports.npm = function npm(command, npmArgs, options, npm) {
  let lib;
  if (arguments.length === 4) {
    lib = arguments[3];
  } else {
    lib = require('npm');
  }

  return new Promise((resolve, reject) => {
    process.argv[0] = 'npm';

    utils.startSpinner();

    npm.load(npmOptions, err => {
      npm.commands.install('', [], (err) => {
        utils.stopSpinner();
        resolve();
      });
    });
  });
};

exports.install = (opts, cli) => {
  let options = Object.assign({}, npmOptions);

  if (opts) {
    options = Object.assign({}, npmOptions, opts);
  }

  return new Promise((resolve, reject) => {
    this.npm('install', [], npmOptions, npm, cli)
    .then(() => resolve())
    .catch(err => reject(err));
  });
};


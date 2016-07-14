'use strict';

const vorpal  = require('vorpal');
const chalk   = require('chalk');
let instances = {};

exports.create = (name, delimiter) => {
  if (!instances[name]) {
    if (!delimiter) {
      delimiter = '$';
    }
    instances[name] = new vorpal().delimiter(chalk.bold(delimiter));

    return instances[name];
  }
};

exports.get = (name) => {
  if (instances[name]) {
    return instances[name];
  }
};

exports.show = (name) => {
  if (instances[name]) {
    instances[name].show();
  }
};

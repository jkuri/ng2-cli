import * as vorpal from 'vorpal';
import * as chalk from 'chalk';

export var instances = {};

export function create(name: string, delimiter: string): any {
  if (!instances[name]) {
    if (!delimiter) {
      delimiter = '$';
    }
    instances[name] = new vorpal(null).delimiter(chalk.bold(delimiter));

    return instances[name];
  }
};

export function get(name: string): any {
  if (instances[name]) {
    return instances[name];
  }
};

export function set(name: string): any {
  if (instances[name]) {
    instances[name].show();
  }
};

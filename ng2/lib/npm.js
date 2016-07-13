'use strict';

const npm = require('npm');

const npmOptions = {
  loglevel: 'error',
  logstream: process.stdout,
  color: 'always',
  optional: true,
  save: true,
  'save-dev': true,
  'save-exact': false
};

exports.npm = function npm(command, npmArgs, options, npm) {
  let lib;
  if (arguments.length === 4) {
    lib = arguments[3];
  } else {
    lib = require('npm');
  }

  return new Promise((resolve, reject) => {
    // lib.load({ logLevel: 'silent' }, {
    //   loaded: false
    // }, (err) => {
    //   console.log(err);
    //   lib.commands.install(npmArgs, (err, data) => {
    //     console.log(err);
    //     console.log(data);
    //   });
    // });


    process.argv[0] = 'npm';

    npm.load({ logLevel: 'verbose' }, function(err) {
      npm.commands.install('', [], (err) => {
        console.log(err);
      });
    });
  });

  // var load = Promise.denodeify(lib.load);

  // return load(options)
  //   .then(function() {
  //     var operation = Promise.denodeify(lib.commands[command]);

  //     return operation(npmArgs || []);
  //   });
};

exports.install = (opts) => {
  let options = Object.assign({}, npmOptions);

  if (opts) {
    options = Object.assign({}, npmOptions, opts);
  }

  return new Promise((resolve, reject) => {
    this.npm('install', [], npmOptions, npm).
    then(() => {
      resolve();
    }).catch(err => {
      reject(err);
    });
  });
};


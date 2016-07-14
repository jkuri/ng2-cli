'use strict';

const Mocha = require('mocha');
const Glob  = require('glob');

const files = Glob.sync('./tests/{acceptance/e2e}/**/*.spec.js');
const mocha = new Mocha({ timeout: 5000, reporter: 'spec' });

files.forEach(file => mocha.addFile(file));

mocha.run(failures => {
  process.on('exit', () => {
    process.exit(failures);
  });
});

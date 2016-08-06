'use strict';

const fs = require('fs');
const ts = require('typescript');
const Mocha = require('mocha');
const Glob  = require('glob');

const files = Glob.sync('./tests/{acceptance,e2e}/**/*.spec.ts');
const mocha = new Mocha({ timeout: 240000, reporter: 'spec' });

require.extensions['.ts'] = function(m, filename) {
  const source = fs.readFileSync(filename).toString();

  try {
    const result = ts.transpile(source, {
      target: ts.ScriptTarget.ES5,
      module: ts.ModuleKind.CommonJs
    });

    return m._compile(result, filename);
  } catch (err) {
    throw err;
  }
};

files.forEach(file => mocha.addFile(file));

mocha.run(failures => {
  process.on('exit', () => {
    process.exit(failures);
  });
});

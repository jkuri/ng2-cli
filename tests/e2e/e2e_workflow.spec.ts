import * as fs from 'fs-extra';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { expect } from 'chai';
import { ng2, npm, existsSync } from '../helpers'; 

describe('E2E Workflow', () {
  before(() => {
    process.env.CLI_ROOT = path.resolve(__dirname, '../../');
    fs.ensureDirSync('tmp');
    process.chdir('tmp');
  });

  after(() => {
    process.chdir('../../');
    rimraf.sync('tmp');
  });

  it('Does install ng2-cli', () => {
    npm(['link']).then(code => {
      expect(code).to.be.equal(true);
    });
  });

  it('Does create new `test-project`', () => {
    ng2(['new', 'test-project'], 'main').then(resp => {
      setTimeout(() => {
        expect(existsSync('test-project')).to.be.equal(true);
        process.chdir('test-project');
        expect(process.cwd()).to.match('test-project');
        expect(existsSync('node_modules')).to.be.equal(true);

        done();
      }, 100);
    });
  });

});

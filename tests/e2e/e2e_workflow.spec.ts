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
    process.chdir(process.env.CLI_ROOT);
    rimraf.sync('tmp');
    setTimeout(() => {
      ng2(['exit'], 'main');
    }, 1000);
  });

  it('Does install ng2-cli', () => {
    npm(['link']).then(code => {
      expect(code).to.be.equal(true);
    });
  });

  it('Does create new `test-project`', () => {
    return ng2(['new', 'test-project'], 'main').then(resp => {
      expect(process.cwd()).to.contains('test-project');
      expect(existsSync('node_modules')).to.be.equal(true);
    });
  });

  it('Does run initial `build` in newly generated project', () => {
    return ng2(['build'], 'main').then(resp => {
      expect(existsSync('build')).to.be.equal(true);
      expect(existsSync('build/index.html')).to.be.equal(true);
      expect(existsSync('build/app.css')).to.be.equal(true);

      return ng2(['clean'], 'main');
    });
  });

  it('Does generate `test` component', () => {
    return ng2(['generate', 'component', 'test'], 'main').then(resp => {
      expect(existsSync('src/app/components/test')).to.be.equal(true);
      expect(existsSync('src/app/components/test/test.component.ts')).to.be.equal(true);
      expect(existsSync('src/app/components/test/test.component.html')).to.be.equal(true);
      expect(existsSync('src/app/components/test/index.ts')).to.be.equal(true);
    });
  });

  it('Does run `build` after creating a component', () => {
    return ng2(['build'], 'main').then(resp => {
      expect(existsSync('build')).to.be.equal(true);
      expect(existsSync('build/index.html')).to.be.equal(true);
      expect(existsSync('build/app.css')).to.be.equal(true);

      return ng2(['clean'], 'main');
    });
  });

  it('Does generate `test-directive` directive', () => {
    return ng2(['generate', 'directive', 'test-directive'], 'main').then(resp => {
      expect(existsSync('src/app/directives/test-directive')).to.be.equal(true);
      expect(existsSync('src/app/directives/test-directive/test-directive.directive.ts')).to.be.equal(true);
      expect(existsSync('src/app/directives/test-directive/index.ts')).to.be.equal(true);
    });
  });

  it('Does run `build` after creating a directive', () => {
    return ng2(['build'], 'main').then(resp => {
      expect(existsSync('build')).to.be.equal(true);
      expect(existsSync('build/index.html')).to.be.equal(true);
      expect(existsSync('build/app.css')).to.be.equal(true);

      return ng2(['clean'], 'main');
    });
  });

  it('Does generate `test-pipe` pipe', () => {
    return ng2(['generate', 'pipe', 'test-pipe'], 'main').then(resp => {
      expect(existsSync('src/app/pipes/test-pipe')).to.be.equal(true);
      expect(existsSync('src/app/pipes/test-pipe/test-pipe.pipe.ts')).to.be.equal(true);
      expect(existsSync('src/app/pipes/test-pipe/index.ts')).to.be.equal(true);
    });
  });

  it('Does run `build` after creating a pipe', () => {
    return ng2(['build'], 'main').then(resp => {
      expect(existsSync('build')).to.be.equal(true);
      expect(existsSync('build/index.html')).to.be.equal(true);
      expect(existsSync('build/app.css')).to.be.equal(true);

      return ng2(['clean'], 'main');
    });
  });

  it('Does generate `foo` service', () => {
    return ng2(['generate', 'service', 'foo'], 'main').then(resp => {
      expect(existsSync('src/app/services/foo')).to.be.equal(true);
      expect(existsSync('src/app/services/foo/foo.service.ts')).to.be.equal(true);
      expect(existsSync('src/app/services/foo/index.ts')).to.be.equal(true);
    });
  });

});

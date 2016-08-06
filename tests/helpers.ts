import * as fs from 'fs';
import { spawn } from 'child_process';
import { getInstances } from '../ng2';

export function ng2(args: string[], instance: string): Promise<any> {
  let instances = getInstances();
  instances['main'].delimiter('');
  instances['server'].delimiter('');

  return new Promise(resolve => {
    resolve(instances[instance].exec(args.join(' ')));
  });
}

export function npm(args: string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    const command = spawn('npm', args);
    
    command.on('error', data => {
      reject(data);
    });

    command.on('close', (code) => {
      resolve(code);
    });
  });
}

export function existsSync(filePath: string): boolean {
  try {
    fs.accessSync(filePath);
    return true;
  } catch (e) {
    return false;
  }
}

import * as fs from 'fs';

export class Helper {
  existsSync(filePath: string): boolean {
    try {
      fs.accessSync(filePath);
      return true;
    } catch (e) {
      return false;
    }
  }

  isInt(value: number): boolean {
    return !isNaN(value);
  }
}

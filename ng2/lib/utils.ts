import * as spinner from 'simple-spinner';

export class Utils {
  startSpinner(): void {
    spinner.start(100, { 
      hideCursor: true
    });
  }

  stopSpinner(): void {
    spinner.stop();
  }
}

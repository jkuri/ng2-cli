import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: '<%= data.classifiedName %>'
})
export class <%= data.classifiedName %>Pipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return null;
  }
}
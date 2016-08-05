import { Directive } from '@angular/core';

@Directive({
  selector: '[<%= data.name %>]'
})
export class <%= data.classifiedName %> {
  constructor() { }
}
import { Component } from '@angular/core';

@Component({
  selector: '<%= data.name %>',
  templateUrl: '<%= data.dasherizedName %>.component.html',
  styleUrls: ['<%= data.dasherizedName %>.component.css']
})
export class <%= data.classifiedName %>Component {
  constructor() { }
}

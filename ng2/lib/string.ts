import * as _ from 'lodash';

export class String {
  constructor(private str: string) { }

  getClassifiedName(): string {
    return _.startCase(_.camelCase(this.str)).replace(/ /g, '');
  }

  getDasherizedName(): string {
    return _.kebabCase(this.str);
  }
}

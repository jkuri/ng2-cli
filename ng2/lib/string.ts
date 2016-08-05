import * as _ from 'lodash';

export class String {
  getClassifiedName(str: string): string {
    return _.capitalize(_.camelCase(str));
  }

  getDasherizedName(str: string): string {
    return _.kebabCase(str);
  }
}

import * as _ from 'lodash';

export class String {
  getClassifiedName(str: string): string {
    return _.startCase(_.camelCase(str)).replace(/ /g, '');
  }

  getDasherizedName(str: string): string {
    return _.kebabCase(str);
  }
}

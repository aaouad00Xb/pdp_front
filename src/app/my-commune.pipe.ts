import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCommune'
})
export class MyCommunePipe implements PipeTransform {

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }

    const filterValue = filter.toLowerCase();

    // Use Array.filter to iterate over each item and apply the deep object filter
    return items.filter(item => this.deepFilter(item, filterValue));
  }

  private deepFilter(obj: any, filterValue: string): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const propertyValue = obj[key];

        if (propertyValue !== null && typeof propertyValue === 'object') {
          // If the property value is an object, recursively apply the deep filter
          if (this.deepFilter(propertyValue, filterValue)) {
            return true;
          }
        } else if (typeof propertyValue === 'string' && propertyValue.toLowerCase().includes(filterValue)) {
          // If the property value is a string, check for a match
          return true;
        }
      }
    }

    return false;
  }
}
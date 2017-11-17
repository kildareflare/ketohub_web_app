import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraySort',
})
export class ArraySortPipe implements PipeTransform {

  transform(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return 1;
      }
      if (a[field] > b[field]) {
        return -1;
      }
      return 0;
    });
    return array;
  }

}

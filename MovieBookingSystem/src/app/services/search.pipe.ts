import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let arrVal: any = "";
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    arrVal = value.filter(function (item: any) {
      return JSON.stringify(item.title).toLowerCase().includes(args);
    });
    if (arrVal.length == 0) {
      return value.filter(function (item: any) {
        return JSON.stringify(item.category).toLowerCase().includes(args);
      });
    }
    return arrVal;
  }

}

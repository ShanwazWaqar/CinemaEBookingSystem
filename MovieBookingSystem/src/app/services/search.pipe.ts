import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let arrVal: any = "";
    if (!value) return null;
    if (!args) return value;
    console.log(value," value");
    console.log(args," args");
    args = args.toLowerCase();
    let result:any = [];
    arrVal = value.filter(function (item: any) {
      if(JSON.stringify(item.title).toLowerCase().includes(args)) {
        result.push(item);
      } 
    });
    return result;
    // console.log(result," result array")
    // if (arrVal.length == 0) {
    //   return value.filter(function (item: any) {
    //     return JSON.stringify(item.category).toLowerCase().includes(args);
    //   });
    // }
    // return arrVal;
    
  }

}

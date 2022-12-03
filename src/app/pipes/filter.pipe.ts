import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any, input: any): any {
   if(input) {
    let result = value.filter((val: any) => val.cityName.toLowerCase().indexOf(input.toLowerCase()) >= 0);
    return result
   }
   else {
    return value;
   }
  }

}

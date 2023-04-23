import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kmConversion'
})
export class KmConversionPipe implements PipeTransform {

  transform(value: any): any {
    console.log(typeof(value))
    if (typeof value === 'string') {
      const meters = parseFloat(value);
      const kilometers = meters / 1000;
      console.log("output value", kilometers)
      return `${kilometers} km`;
    }else{
    const kilometers = value / 1000;
      console.log("output value", kilometers)
      return `${kilometers} km`;
    }
  }

}
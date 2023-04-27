import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'binaryPipe'
})
export class BinaryPipe implements PipeTransform {

  transform(value: any): any {

    console.log(typeof(value))
   
      const binary = parseFloat(value);
      let convert = "false"
      if(binary === 0){
        convert = "false"
      }else{
        convert = "true"
      }
      console.log("output value", convert)
      return  convert ;
    
  }

}
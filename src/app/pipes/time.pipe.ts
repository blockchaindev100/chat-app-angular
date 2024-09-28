import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string|undefined, ...args: unknown[]): unknown {
    if (typeof value==undefined){
      return ""
    }
    let date = new Date(value as string);
    let hour = date.getHours();
    let hourLen = String(hour).length;
    let min = date.getMinutes();
    let minLen = String(min).length;
    return `${(hourLen != 2) ? "0" + hour : hour} : ${(minLen != 2) ? "0" + min : min}`;
  }

}

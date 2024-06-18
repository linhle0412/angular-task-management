import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority',
})
export class PriorityPipe implements PipeTransform {
  transform(value: string): string {
    if (value == '0') return 'Low';
    if (value == '1') return 'Medium';
    return 'High';
  }
}

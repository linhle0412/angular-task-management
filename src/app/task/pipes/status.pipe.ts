import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: string): string {
    if (value == 'new') return 'New';
    if (value == 'in_progress') return 'In Progress';
    return 'Done';
  }
}

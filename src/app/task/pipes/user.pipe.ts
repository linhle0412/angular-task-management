import { Pipe, PipeTransform } from '@angular/core';
import { SharedStore } from '../../shared/shared-store';
import { Observable, filter, map, reduce } from 'rxjs';

@Pipe({
  name: 'user',
})
export class UserPipe implements PipeTransform {
  constructor(private sharedStore: SharedStore) {}
  transform(value: string[]): Observable<String | undefined> {
    return this.sharedStore.users$.pipe(map((data) => data.filter((d) =>value.includes(d.id!)).map((d) => d.name ?? d.email).join(', ')))
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../task.type';
import { Observable } from 'rxjs';
import { SharedStore } from '../../../shared/shared-store';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  @Input()
  tasks!: Observable<ITask[]>;
  @Output() onRemove = new EventEmitter<string>();
  @Output() onSort = new EventEmitter<'asc' | 'desc'>();

  orderDirection: 'asc' | 'desc' = 'desc';

  constructor(private sharedStore: SharedStore) {

  }

  get users() {
    return this.sharedStore.users$
  }

  removeTask($event: any) {
    this.onRemove.emit($event);
  }

  sort() {
    this.orderDirection = this.orderDirection == 'asc' ? 'desc' : 'asc';
    this.onSort.emit(this.orderDirection);
  }
}

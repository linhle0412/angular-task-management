import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../task.type';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task!: ITask;
  @Output() onRemove = new EventEmitter<string>();

  removeTask($event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    this.onRemove.emit(this.task.id);
  }
}

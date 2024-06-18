import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITask } from '../../task.type';
import { selectSelectedTask } from '../../store/task.selectors';
import { clearTaskDetail, loadTaskDetail } from '../../store/task.actions';
import { TaskState } from '../../store/task.reducer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent implements OnInit {
  taskDetail$: Observable<ITask | null>;

  constructor(private store: Store<TaskState>, private route: ActivatedRoute) {
    this.taskDetail$ = this.store.pipe(select(selectSelectedTask));
  }
  get taskId() {
    return this.route.snapshot.paramMap.get('id');
  }
  get btnText() {
    return this.taskId ? 'Update' : 'Add';
  }
  ngOnInit() {
    if (this.taskId) {
      this.store.dispatch(loadTaskDetail({ id: this.taskId! }));
    }
  }

  ngOnDestroy() {
    this.store.dispatch(clearTaskDetail())
  }
}

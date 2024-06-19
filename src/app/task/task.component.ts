import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask, ITasksQueryParams } from './task.type';
import { Store, select } from '@ngrx/store';
import { TaskState } from './store/task.reducer';
import { TasksActionTypes, loadTasks } from './store/task.actions';
import { selectAllTasks, selectTasksIsLoading } from './store/task.selectors';
import { TaskService } from './task.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../shared/shared.service';
import { SharedStore } from '../shared/shared-store';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  tasks$: Observable<ITask[]>;
  loading$: Observable<boolean>;

  searchValue: string = '';
  filterParams: ITasksQueryParams = {
    status: 'new',
    orderByPriorityDirection: 'desc',
    q: '',
  };

  constructor(
    private store: Store<TaskState>,
    private taskService: TaskService,
    private toastr: ToastrService,
  ) {
    this.tasks$ = this.store.pipe(select(selectAllTasks));
    this.loading$ = this.store.pipe(select(selectTasksIsLoading))
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.store.dispatch(loadTasks(this.filterParams));
  }

  async onRemoveTask(id: string) {
    try {
      await this.taskService.removeTask(id);
      this.toastr.success('This task has been deleted');
    } catch (e: any) {
      this.toastr.error(e);
    }
  }
  onChangeStatus($event: string) {
    this.filterParams.status = $event;
    this.loadData();
  }
  onSort($event: 'desc' | 'asc') {
    this.filterParams.orderByPriorityDirection = $event;
    this.loadData();
  }
  onSearch() {
    this.filterParams.q = this.searchValue;
    this.loadData();
  }
}

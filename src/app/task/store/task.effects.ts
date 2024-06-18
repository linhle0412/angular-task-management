import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import {
  TasksActionTypes,
  addTaskSuccess,
  loadTaskDetailSuccess,
  loadTasksSuccess,
} from './task.actions';
import { TaskService } from '../task.service';
import { EMPTY } from 'rxjs';
import { ITask } from '../task.type';

export const loadTasks = createEffect(
  (actions$ = inject(Actions), taskService = inject(TaskService)) => {
    return actions$.pipe(
      ofType(TasksActionTypes.LoadTasks),
      switchMap((queryParams) =>
        taskService.getTasks(queryParams).pipe(
          map((tasks) => loadTasksSuccess({ tasks })),
          catchError(() => EMPTY)
        )
      )
    );
  },
  { functional: true }
);

export const loadTaskDetail = createEffect(
  (actions$ = inject(Actions), taskService = inject(TaskService)) => {
    return actions$.pipe(
      ofType(TasksActionTypes.LoadTaskDetail),
      switchMap((action) =>
        taskService.getTaskDetail(action.id).pipe(
          map((snapshot) =>
            loadTaskDetailSuccess({ task: snapshot.data() as ITask })
          ),
          catchError(() => EMPTY)
        )
      )
    );
  },
  { functional: true }
);

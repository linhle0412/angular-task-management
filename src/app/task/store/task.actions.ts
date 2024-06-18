import { createAction, props } from '@ngrx/store';
import { ITask, ITasksQueryParams } from '../task.type';

export enum TasksActionTypes {
  LoadTasks = '[Tasks] Load Tasks',
  LoadTasksSuccess = '[Tasks] Load Tasks Success',
  AddTask = '[Tasks] Add Task',
  AddTaskSuccess = '[Tasks] Add Task Success',
  LoadTaskDetail = '[Tasks] Load Task Detail',
  LoadTaskDetailSuccess = '[Tasks] Load Task Detail Success',
  ClearTaskDetail = '[Tasks] Clear Task Detail'
}

export const loadTasks = createAction(
  TasksActionTypes.LoadTasks,
  props<ITasksQueryParams>()
);
export const loadTasksSuccess = createAction(
  TasksActionTypes.LoadTasksSuccess,
  props<{ tasks: ITask[] }>()
);

export const loadTaskDetail = createAction(
  TasksActionTypes.LoadTaskDetail,
  props<{ id: string }>()
);

export const loadTaskDetailSuccess = createAction(
  TasksActionTypes.LoadTaskDetailSuccess,
  props<{ task: ITask }>()
);

export const clearTaskDetail = createAction(
  TasksActionTypes.ClearTaskDetail,
);

export const addTask = createAction(
  TasksActionTypes.AddTask,
  props<{ task: any }>()
);
export const addTaskSuccess = createAction(
  TasksActionTypes.AddTaskSuccess,
  props<{ task: any }>()
);

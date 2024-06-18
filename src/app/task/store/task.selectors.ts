import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TaskState,
  getAllTasks,
  getIsLoading,
  getSelectedTask,
} from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('taskState');

export const selectAllTasks = createSelector(selectTaskState, getAllTasks);
export const selectSelectedTask = createSelector(
  selectTaskState,
  getSelectedTask
);

export const selectTasksIsLoading = createSelector(
  selectTaskState,
  getIsLoading
);

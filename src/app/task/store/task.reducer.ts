import { createReducer, on } from '@ngrx/store';
import { ITask } from '../task.type';
import {
  addTask,
  addTaskSuccess,
  clearTaskDetail,
  loadTaskDetail,
  loadTaskDetailSuccess,
  loadTasks,
  loadTasksSuccess,
} from './task.actions';

export const initialTasks: ITask[] = [];

export interface TaskState {
  tasks: ITask[];
  selectedTask: ITask | null;
  isLoading: boolean;
}

export const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  isLoading: false,
};
export const taskReducer = createReducer(
  initialState,
  on(loadTasks, (state) => ({ ...state, isLoading: true })),
  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    isLoading: false,
    tasks,
  })),
  on(addTask, (state) => ({ ...state, isLoading: true })),
  on(addTaskSuccess, (state, { task }) => ({ ...state, isLoading: true })),
  on(loadTaskDetail, (state) => ({ ...state, isLoading: true })),
  on(loadTaskDetailSuccess, (state, { task }) => ({
    ...state,
    isLoading: false,
    selectedTask: task,
  })),
  on(clearTaskDetail, (state) => ({...state, selectedTask: null}))
);

// Selectors
export const getAllTasks = (state: TaskState) => state.tasks;
export const getSelectedTask = (state: TaskState) => state.selectedTask;
export const getIsLoading = (state: TaskState) => state.isLoading;

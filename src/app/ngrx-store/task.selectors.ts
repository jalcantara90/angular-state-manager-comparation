import { createFeatureSelector, createSelector } from '@ngrx/store';
import { tasksFeatureKey, selectAll, State } from './task.reducer';
import { Task } from '../task/task.model';

const taskState = createFeatureSelector<State>(tasksFeatureKey);

export const allTask = createSelector(
  taskState,
  selectAll
);

export const pendingTask = createSelector(
  allTask,
  (taskList: Task[]) => taskList.filter(task => task.status === 'pending')
);

export const completedTask = createSelector(
  allTask,
  (taskList: Task[]) => taskList.filter(task => task.status === 'completed')
);

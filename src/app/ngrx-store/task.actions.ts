import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Task } from '../task/task.model';

export const loadTasks = createAction(
  '[Task NGRX] Load Tasks',
  props<{ tasks: Task[] }>()
);

export const addTask = createAction(
  '[Task NGRX] Add Task',
  props<{ task: Task }>()
);

export const upsertTask = createAction(
  '[Task NGRX] Upsert Task',
  props<{ task: Task }>()
);

export const addTasks = createAction(
  '[Task NGRX] Add Tasks',
  props<{ tasks: Task[] }>()
);

export const upsertTasks = createAction(
  '[Task NGRX] Upsert Tasks',
  props<{ tasks: Task[] }>()
);

export const updateTask = createAction(
  '[Task NGRX] Update Task',
  props<{ task: Update<Task> }>()
);

export const updateTasks = createAction(
  '[Task NGRX] Update Tasks',
  props<{ tasks: Update<Task>[] }>()
);

export const deleteTask = createAction(
  '[Task NGRX] Delete Task',
  props<{ id: string }>()
);

export const deleteTasks = createAction(
  '[Task NGRX] Delete Tasks',
  props<{ ids: string[] }>()
);

export const clearTasks = createAction(
  '[Task NGRX] Clear Tasks'
);

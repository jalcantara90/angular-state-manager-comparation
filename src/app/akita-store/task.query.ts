import { QueryEntity } from '@datorama/akita';
import { TaskStore, TaskState } from './task.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskQuery extends QueryEntity<TaskState> {
  constructor(protected store: TaskStore) {
    super(store);
  }
}

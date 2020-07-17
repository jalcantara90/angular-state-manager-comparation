import { EntityState, StoreConfig, EntityStore } from '@datorama/akita';
import { Task } from 'src/app/task/task.model';
import { Injectable } from '@angular/core';

export interface TaskState extends EntityState<Task, string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tasks' })
export class TaskStore extends EntityStore<TaskState> {

  constructor() {
    super();
  }
}

import { Injectable } from '@angular/core';
import { TaskFacadeInterface } from '../shared/task-facade.interface';
import { Observable, Subject, merge } from 'rxjs';
import { Task } from '../task/task.model';
import { switchMap, map, mapTo, startWith } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { allTask, completedTask, pendingTask } from './task.selectors';
import { loadTasks, addTask, deleteTask, updateTask } from './task.actions';
import * as fromTask from './task.reducer';

@Injectable({
  providedIn: 'root'
})
export class TaskNgrxStoreFacadeService implements TaskFacadeInterface {

  showAll$: Observable<Task[]> = this.store.pipe(select(allTask));
  showAllSubject = new Subject();
  showCompleteSubject = new Subject();
  showPendingSubject = new Subject();

  public taskList$ = merge(
    this.showAllSubject,
    this.showCompleteSubject.pipe(mapTo('completed')),
    this.showPendingSubject.pipe(mapTo('pending'))
  ).pipe(
    startWith(''),
    switchMap((filter) => {
      switch (filter) {
        case 'pending':
          return this.store.pipe(select(pendingTask));
        case 'completed':
          return this.store.pipe(select(completedTask));
        default:
          return this.showAll$;
      }
    }),
    map(taskList => taskList.map(task => new Task(task.description, task.status, task.id)))
  );

  constructor(private store: Store<fromTask.State>) { }

  getTask() {
    this.store.dispatch(
      loadTasks({
        tasks: [
          new Task('Photos', 'pending'),
          new Task('Recipes', 'pending'),
          new Task('Work', 'pending'),
          new Task('Vacation Itinerary', 'completed'),
          new Task('Kitchen Remodel', 'completed'),
        ]
      })
    );
  }

  showAll() {
    this.showAllSubject.next();
  }

  showCompleted() {
    this.showCompleteSubject.next();
  }

  showPending() {
    this.showPendingSubject.next();
  }

  addTask(task: Task) {
    this.store.dispatch(addTask({ task }));
  }

  deleteTask(id: string) {
    this.store.dispatch(deleteTask({ id }));
  }

  updateTask(task: Task) {
    const taskUpdated = new Task(task.description, task.status, task.id);
    taskUpdated.toogleStatus();
    this.store.dispatch(updateTask({ task: { id: taskUpdated.id, changes: { status: taskUpdated.status } }}));
  }
}

import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromTask from './task.reducer';
import { loadTasks, addTask, deleteTask, updateTask } from './task.actions';
import { Task } from '../task/task.model';
import { allTask, completedTask, pendingTask } from './task.selectors';
import { map, switchMap, delay } from 'rxjs/operators';
import { Subject, Observable, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskNgrxStoreService {

  showAllSubject: Subject<Task[]> = new Subject();
  showAll$: Observable<Task[]> = this.showAllSubject.asObservable().pipe(
    switchMap(() => this.store.pipe(
      select(allTask),
      delay(0)
    ))
  );
  showCompleteSubject: Subject<Task[]> = new Subject();
  showComplete$: Observable<Task[]> = this.showCompleteSubject.asObservable().pipe(
    switchMap(() => this.store.pipe(
      select(completedTask)
    ))
  );
  showPendingSubject: Subject<Task[]> = new Subject();
  showPending$: Observable<Task[]> = this.showPendingSubject.asObservable().pipe(
    switchMap(() => this.store.pipe(
      select(pendingTask)
    ))
  );

  taskList$ = merge(
    this.showAll$,
    this.showComplete$,
    this.showPending$
  ).pipe(
    map(taskList => taskList.map( task => new Task(task.description, task.status, task.id)))
  );

  constructor(private store: Store<fromTask.State>) { }

  getTask() {
    this.store.dispatch(loadTasks({
      tasks: [
        new Task('Photos', 'pending'),
        new Task('Recipes', 'pending'),
        new Task('Work', 'pending'),
        new Task('Vacation Itinerary', 'completed'),
        new Task('Kitchen Remodel', 'completed'),
      ]
    }));
    setTimeout(() => this.showAll());
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
    this.store.dispatch(updateTask({ task: { id: taskUpdated.id, changes: { ...taskUpdated} }}));
  }
}
